const { gulp, minify } 	= builder.packages;
const files 			= builder.files;

module.exports = (jsFiles = files.minify.js, options = {}) => {
	return new Promise((resolve, reject) => {
		return gulp.src(jsFiles, options)
			.pipe(minify({
				ext: {
					min: '.min.js'
				},
				ignoreFiles: [
					".build.min.js"
				]
			}))
			.pipe(gulp.dest(files.compileOutput))
			.on("end", resolve)
			.on("error", reject);
	});
};
