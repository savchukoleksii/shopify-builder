const { themeRoot }		= builder;
const {
	gulp,
	rename,
	plumber,
	sass,
	sourcemaps,
	postcss,
	gulpif,
	cached,
	sassInheritance,
	filter
} = builder.packages;

const files 	= builder.files;
const path		= require("path");
const plugins 	= Object.values(builder.options.postcss.plugins);

module.exports = (scssFiles = files.scss, options = {}) => {
	return new Promise((resolve, reject) => {
		return gulp.src(scssFiles, options)
			.pipe(plumber())
			.pipe(gulpif(global.sassWatch === true, cached("scss")))
			.pipe(sassInheritance({
				dir: './src/styles/'
			}))
			.pipe(filter(function (file) {
				return !/\/_/.test(file.path) || !/^_/.test(file.relative);
			}))
			.pipe(sourcemaps.init({
				largeFile: true
			}))
			.pipe(
				sass({
					outputStyle: "expanded",
					sourceComments: false,
					indentType: "tab",
					indentWidth: 1,
					includePaths: [
						path.resolve(themeRoot, files.nodeModules)
					],
					importer: (url) => {
						switch (true) {
							case url.indexOf("~") === 0 : {
								return {
									file: path.resolve(themeRoot, files.nodeModules, url.substr(1))
								};
							}
							case url.indexOf("@") === 0 : {
								return {
									file: path.resolve(themeRoot, files.styles, url.substr(1))
								};
							}
							default: {
								return {
									file: url
								};
							}
						}
					}
				}).on('error', sass.logError)
			)
			.pipe(rename({
				prefix: files.filePrefix || '',
				suffix: '.build',
				dirname: ""
			}))
			.pipe(postcss(plugins))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(files.compileOutput))
			.on("end", resolve)
			.on("error", reject);
	});
};
