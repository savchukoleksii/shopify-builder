const fs 			= require("fs");
const packageJSON 	= require(`${__dirname}/package.json`);

function builderRequire(packageName) {
	return require(packageName);
}

const sass 	    = builderRequire("gulp-sass")(builderRequire('sass'));

global.builder = {
	require: builderRequire,
};

const { hideBin }   = builder.require("yargs/helpers");
const yargs         = builder.require("yargs")(hideBin(process.argv));

builder.packages = {
	autoprefixer: builder.require("autoprefixer"),
	ansi: builder.require("gulp-cli/lib/shared/ansi"),
	exit: builder.require("gulp-cli/lib/shared/exit"),
	axios: builder.require("axios"),
	browserSync: builder.require("browser-sync"),
	spawn: builder.require("cross-spawn"),
	cssnano: builder.require("cssnano"),
	findRoot: builder.require("find-root"),
	gulp: builder.require("gulp"),
	cached: builder.require("gulp-cached"),
	clean: builder.require("gulp-clean"),
	copy: builder.require("gulp-copy"),
	download: builder.require("gulp-download2"),
	decompress: builder.require("gulp-decompress"),
	filter: builder.require("gulp-filter"),
	gulpif: builder.require("gulp-if"),
	minify: builder.require("gulp-minify"),
	plumber: builder.require("gulp-plumber"),
	postcss: builder.require("gulp-postcss"),
	prettier: builder.require("gulp-prettier"),
	rename: builder.require("gulp-rename"),
	sass: sass,
	sassInheritance: builder.require("gulp-sass-inheritance"),
	sourcemaps: builder.require("gulp-sourcemaps"),
	svgo: builder.require("gulp-svgo"),
	zip: builder.require("gulp-zip"),
	gulplog: builder.require("gulplog"),
	datetime: builder.require("node-datetime"),
	promptConfirm: builder.require("prompt-confirm"),
	serveStatic: builder.require("serve-static"),
	through: builder.require("through2"),
	webpack: builder.require("webpack"),
	webpackDevMiddleware: builder.require("webpack-dev-middleware"),
	webpackDevServer: builder.require("webpack-dev-middleware"),
	webpackHotMiddleware: builder.require("webpack-hot-middleware"),
	webpackStream: builder.require("webpack-stream"),
	yaml: builder.require("yaml"),
	yargs: yargs,
	themekit: builder.require("@shopify/themekit"),
	translations: builder.require("@savchukoleksii/gulp-shopify-theme-translations-tool"),
	settings: builder.require("@savchukoleksii/gulp-shopify-theme-settings-tool"),
};

const { findRoot } 	        = builder.packages;
const { join, normalize } 	= require("path");

const workingDirectory 	= process.cwd();
const currentDirectory 	= __dirname;

function getThemeRoot() {
	try {
		return findRoot(workingDirectory);
	} catch (error) {}

	return process.cwd();
}

const themeRoot	= getThemeRoot();
function getDefaultGulpPath() {
	try {
		const defaultGulpPath = join(themeRoot, normalize('node_modules/.bin/gulp'));

		if (fs.existsSync(defaultGulpPath)) {
			return defaultGulpPath;
		}

		throw new Error();
	} catch(error){}

	return join(currentDirectory, normalize('node_modules/.bin/gulp'));
}

function getDefaultCliPath() {
	try {
		const defaultCliPath = join(themeRoot, normalize('node_modules/.bin/shopify'));

		if (fs.existsSync(defaultCliPath)) {
			return defaultCliPath;
		}

		throw new Error();
	} catch(error){}

	return join(currentDirectory, normalize('node_modules/.bin/shopify'));
}

const defaultGulpPath 	= getDefaultGulpPath();
const defaultCliPath = getDefaultCliPath();

global.builder = {
	...builder,
	gulpFile: join(currentDirectory, 'gulpfile.js'),
	gulpPath: defaultGulpPath,
	cliPath: defaultCliPath,
	themeRoot: themeRoot,
}

builder.files = {
	src: "src",
	dist: "dist",
	settingsDir: "./.builder/settings",
	themekit: {
		download: "src",
		watch: "dist"
	},
	webpack: {},
	svg: {
		general: "./src/icons/*.svg",
		snippets: "./src/snippets"
	},
	srcAssets: "./src/assets",
	scss: [
		"!./src/styles/_*.{scss,sass}",
		"./src/styles/*.{scss,sass}",
	],
	scssLiquid: "./src/styles/*.css.liquid",
	compileOutput: "./dist/assets",
	js: "./src/scripts/*.js",
	copy: [
		"./src/assets/*.*",
		"./src/config/*.json",
		"./src/layout/*.{liquid,json}",
		"./src/locales/*.json",
		"./src/sections/*.liquid",
		"./src/snippets/*.*",
		"./src/templates/*.liquid",
		"./src/templates/customers/*.liquid",
		"!./src/snippets/variables.liquid",
		"!./src/templates/index.settings.{liquid,json}",
		"!./src/templates/index.translations.{liquid,json}",
		"!./src/assets/*.build.{js,css}",
		"!./src/assets/*.build.min.{js,css}"
	],
	copyJsonTemplates: [
		"./src/templates/*.json",
		"./src/templates/customers/*.json"
	],
	liquid: [
		"./src/layout/*.{liquid,json}",
	],
	minify: {
		css: [
			`./dist/assets/*.build.css`,
			`!./dist/assets/*.build.min.css`
		],
		js: [
			`./dist/assets/*.build.js`,
			`!./dist/assets/*.build.min.js`
		]
	},
	lintConfigs: {
		css: "./csslintrc.json"
	},
	lintPaths: {
		css: [
			`./src/assets/*.css`,
			`!./src/assets/*.min.css`
		],
		js: [
			`./src/scripts/**/*.js`,
			`!./src/scripts/**/*.min.js`
		]
	},
	settings: `./src/config/settings_schema.json`,
	nodeModules: "node_modules",
	styles: "src/styles",
	filePrefix: ''
};

const yargsShopifyOptions = require("./builder/helpers/yargsShopifyOptions");

builder.helpers = {
	entries: require("./builder/helpers/entries"),
	themePath: require("./builder/helpers/themePath"),
	errorLogger: require("./builder/helpers/errorLogger"),
	watch: require("./builder/helpers/watch"),
	yargsShopifyOptions: yargsShopifyOptions,
	rewriteRule: require("./builder/helpers/rewriteRule"),
};

builder.options = {
	postcss: {
		syntax: 'postcss-scss',
		plugins: {
			autoprefixer: builder.require("autoprefixer"),
			cssImport: builder.require("postcss-import"),
		}
	},
	webpack: require("./builder/webpack.config"),
};

builder.functions = {
	images: {
		svg: require("./builder/functions/images/svg"),
	},
	js: {
		build: require("./builder/functions/js/build"),
		minify: require("./builder/functions/js/minify"),
	},
	styles: {
		build: require("./builder/functions/styles/build"),
		variables: require("./builder/functions/styles/variables"),
		minify: require("./builder/functions/styles/minify"),
	},
	others: {
		copy: require("./builder/functions/others/copy"),
		removeSettingsFromJsonTemplates: require("./builder/functions/others/removeSettingsFromJsonTemplates"),
		mergeSettingsFromDeploymentTheme: require("./builder/functions/others/mergeSettingsFromDeploymentTheme"),
		downloadSettings: require("./builder/functions/others/downloadSettings"),
	}
};

module.exports = function (callback) {
	const composedCallback = (args) => {
		builder.args       = args;
		builder.command    = args["_"][0];

		if(["start", "watch", "deploy", "download"].includes(builder.command)) {
			require("./builder/config/themekit");
		}

		callback(args);
	};

	return yargs
		.scriptName("builder")
		.command("build", "build project files", () => {}, composedCallback)
		.command("zip", "create production ready archive", () => {}, composedCallback)
		.command(
			"watch",
			"watch files and upload into Shopify",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.option("port", {
						describe: 'Development server port',
						type: 'number',
						alias: "p",
						default: 3000
					})
					.option("serverless", {
						describe: "Will run this command without dev server",
						type: 'boolean',
						default: false
					})
					.option("cli", {
						describe: "Will run this command with Shopify CLI",
						type: 'boolean',
						default: false
					});
			},
			composedCallback
		)
		.command(
			"start",
			"deploy files into Shopify and run watch",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.option("force", {
						describe: "Deploy force with deleting files on Shopify",
						type: "boolean",
						default: false
					})
					.option("port", {
						describe: 'Development server port',
						type: 'number',
						alias: "p",
						default: 3000
					})
					.option("serverless", {
						describe: "Will run this command without dev server",
						default: false
					})
					.option("cli", {
						describe: "Will run this command with Shopify CLI",
						type: 'boolean',
						default: true
					});
			},
			composedCallback
		)
		.command(
			"deploy [files..]",
			"deploy files into Shopify",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.option("force", {
						describe: "Deploy force with deleting files on Shopify",
						type: "boolean",
						default: false
					})
					.positional('files', {
						describe: 'Files to download from Shopify',
						type: 'array',
						default: []
					})
					.option("cli", {
						describe: "Will run this command with Shopify CLI",
						type: 'boolean',
						default: false
					});
			},
			composedCallback
		)
		.command(
			"download [files..]",
			"download files from Shopify",
			(yargs) => {
				yargsShopifyOptions(yargs)
					.positional('files', {
						describe: 'Files to download from Shopify',
						type: 'array',
						default: []
					})
					.option("dir", {
						default: `./src`
					});
			},
			composedCallback
		)
		.command(
			"create [archive]",
			"create new project",
			(yargs) => {
				return yargs
					.option("archive", {
						describe: "Url or path to zip archive",
						default: "https://github.com/savchukoleksii/shopify-starter-theme/archive/refs/heads/main.zip"
					});
			},
			composedCallback
		)
		.help()
		.wrap(null)
		.demandCommand(1)
		.version(`v${packageJSON.version}`)
		.argv;
};
