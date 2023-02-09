const { gulp, copy, plumber } = builder.packages;
const files 	= builder.files;

module.exports = (copyFiles = files.copy, options = {}, pluginOptions = {
	prefix: 1
}) => {
    return gulp.src(copyFiles, options)
        .pipe(plumber())
        .pipe(copy(files.dist, pluginOptions));
};
