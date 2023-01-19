const path			= require('path');
const { themeRoot }	= builder;
const {
	gulp,
	axios,
	webpack,
	gulplog,
	ansi,
	browserSync,
	webpackDevMiddleware,
	webpackHotMiddleware,
	serveStatic
} = builder.packages;

const {
	rewriteRule,
	entries,
	errorLogger
}	= builder.helpers;

const webpackConfig 			= builder.options.webpack;
const argv 						= builder.args;

let browserSyncServer = null;
const createServer = async () => {
	const config = builder.options.themekit;

	try {
		let port = argv.port || 3000;

		if(!config.store) {
			return;
		}

		let shop = { domain: null };
		try {
			shop = await axios(`https://${config.store}/admin/api/2022-10/shop.json?fields=id,domain`, {
				method: "GET",
				responseType: "json",
				headers: {
					'X-Shopify-Access-Token': config.password,
					'Content-Type': 'application/json',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
				}
			}).then(response => response.data).then(response => response.shop);
		} catch (error) {

		}

		let preview_url = `https://${shop.domain ? shop.domain : config.store}/?preview_theme_id=${config["theme_id"]}`;
		if (argv.preview && config["preview_url"]) {
			preview_url = config["preview_url"];
		}

		const options = {
			hot: true, // should always be true --- BrowserSync without HMR is pretty pointless
			inline: true,
			devServer: true,
			browserSync: true
		};

		const rewriteRules = [
			rewriteRule(/(http:|https:)?\/\/cdn\.shopify\.com\/(?<folder>(?!shopifycloud)(?!s\/javascripts)(?!s\/assets\/storefront)\w+\/)+(?<file>(?!shop_events_listener)[-\w^&'@{}[\],$=!#().]+)(\?((v=)?\d+))?/gm, port),
			{
				match: new RegExp(`(http:|https:)?//${config.shop}`, 'gm'),
				fn: function (req, res, match) {
					return `https://${req.headers.host}`
				}
			},
			...(shop.domain ? [
				{
					match: new RegExp(`(http:|https:)?//${shop.domain}`, 'gm'),
					fn: function (req, res, match) {
						return `https://${req.headers.host}`
					}
				}
			] : [])
		];

		const bundler = webpack({
			...webpackConfig,
			stats: "detailed",
			mode: "development",
			entry: () => {
				const entryPoints = [
					'src/scripts/*.js',
					'src/scripts/sections/*.js',
					'src/scripts/templates/*.js',
					'src/scripts/layouts/*.js',
				];

				const entryFiles = entryPoints.reduce((entryPoints, entryPoint) => {
					return {
						...entryPoints,
						...entries(entryPoint),
					}
				}, {});

				return {
					webpackHotMiddleware: 'webpack-hot-middleware/client?reload=true',
					...(Object.keys(entryFiles).reduce((entries, key) => {
						return {
							...entries,
							[key]: [`webpack-hot-middleware/client?name=${key}`, entryFiles[key]]
						}
					}, {})),
				}
			}
		});

		if(!bundler.getInfrastructureLogger) {
			bundler.getInfrastructureLogger = () => {
				return console;
			}
		}

		const middleware = [
			webpackDevMiddleware(bundler, {
				// IMPORTANT: dev middleware can't access config, so we should
				// provide publicPath by ourselves
				publicPath: webpackConfig.output.publicPath,
				index: false,
				// pretty colored output
				stats: {
					colors: true,
					hash: false,
					version: false,
					timings: false,
					assets: false,
					chunks: false,
					modules: false,
					reasons: false,
					children: false,
					source: false,
					errors: true,
					errorDetails: true,
					warnings: false,
					publicPath: false
				},
				mimeTypes: {
					'application/wasm': ['wasm']
				}
				// for other settings:
				// @see https://webpack.js.org/guides/development/#webpack-dev-middleware
			}),
		];

		if (options.hot === true) {
			// bundler should be the same as above
			middleware.push(webpackHotMiddleware(bundler, {
				log: () => {},
				publicPath: webpackConfig.output.publicPath,
			}));
		}

		middleware.push(serveStatic(path.join(themeRoot, '/dist'), {
			index: false,
			redirect: false
		}));

		const queryStringComponents = ['_ab=0', 'pb=0', '_fd=0', '_sc=1'];
		const browserSyncCallback 	= async function (error, bs) {
			if (error) {
				gulplog.error(ansi.red(error.message));
				return;
			}

			gulplog.info(`Preview: ${preview_url}`);
		};

		const browserSyncOptions = {
			port: port,
			host: config.store,
			notify: false,
			directory: true,
			open: !browserSyncServer,
			proxy: {
				target: preview_url,
				cookies: {
					stripDomain: false
				},
				ws: true,
				middleware: [
					...middleware,
					function(req, res, next) {
						const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
						req.url += prefix + queryStringComponents.join('&');

						next();
					}
				],
				proxyRes: [
					function(proxyRes) {
						// disable HSTS. Slate might force us to use HTTPS but having HSTS on local dev makes it impossible to do other non-Slate dev.
						delete proxyRes.headers['strict-transport-security'];
					},
				],
			},
			ghostMode: false,
			stream: true,
			logSnippet: false,
			snippetOptions: {
				// fix https://community.shopify.com/c/Technical-Q-A/Unknown-error-using-Slate-and-Browser-Sync/td-p/564376
				rule: {
					match: /<head[^>]*>/i,
					fn: function(snippet, match) {
						return match + snippet;
					}
				}
			},
			rewriteRules: rewriteRules,
			online: true,
		};

		browserSyncServer = browserSync.create();
		browserSyncServer.init(browserSyncOptions, browserSyncCallback)
	} catch (error) {
		gulplog.error(ansi.red(error.message));
	}
};

const server = async () => {
	await createServer();

	const reloadServer = async () => {
		if (browserSyncServer) {
			await browserSyncServer.exit();
		}

		await createServer();
	};

	reloadServer.displayName = "reload:server";
	gulp.watch([
		"./src/scripts/*.js",
		"./src/scripts/sections/*.js",
		"./src/scripts/templates/*.js",
		"./src/scripts/layouts/*.js",
	]).on("all", function (event, file) {
		if(!["add", "unlink"].includes(event)) {
			return;
		}

		gulp.series([
			reloadServer
		])(errorLogger);
	});
}

server.displayName = "server";

module.exports = server;
