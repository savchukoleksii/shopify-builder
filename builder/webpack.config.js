const { entries, themePath } = builder.helpers;
const fs			= require("fs");
const files 		= builder.files;
const { webpack }   = builder.packages;

const webpackConfig = {
	name: "javascript",
	mode: "development",
	entry: () => entries("src/scripts/**.js"),
	stats: 'errors-only',
	node: {
		global: true,
	},
	output: {
		path: themePath("./dist/assets"),
		publicPath: "/assets/",
		filename: `${files.filePrefix || ''}[name].build.js`,
		chunkFilename: '[name].[contenthash].chunk.build.js',
	},
	resolve: {
		extensions: ['.js', '.mjs'],
		alias: {
			"@": themePath("./src/scripts"),
		}
	},
	optimization: {
		splitChunks: {
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					priority: -10,
					reuseExistingChunk: true,
					enforce: true,
					chunks: 'all'
				},
			}
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						"exclude": [
							// \\ for Windows, \/ for Mac OS and Linux
							/node_modules[\\\/]core-js/,
							/node_modules[\\\/]webpack[\\\/]buildin/,
						],
						presets: [
							[
								"@babel/preset-env",
								{
									"useBuiltIns": "usage", // alternative mode: "entry"
									"corejs": 3, // default would be 2
									"targets": "> 0.25%, not dead"
									// set your own target environment here (see Browserslist)
								}
							]
						]
					}
				}
			}
		]
	},
	performance: {
		maxEntrypointSize: 5120000,
		maxAssetSize: 5120000
	},
	watchOptions: {
		aggregateTimeout: 600,
		poll: 1000,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

let config 			= webpackConfig;
const configPath 	= themePath("./builder.config.js");

if (fs.existsSync(configPath)) {
	const customConfig = require(configPath);

	if (Object.keys(customConfig).includes("webpack") && typeof customConfig["webpack"] === "function") {
		config = customConfig["webpack"](config);
	}
}

module.exports = config;
