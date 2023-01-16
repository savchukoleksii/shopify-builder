const { gulp, copy, plumber } = builder.packages;
const files 	= builder.files;

module.exports = (copyFiles = files.copy, options = {}) => {
    return gulp.src(copyFiles, options)
        .pipe(plumber())
        .pipe(copy(files.dist, {
            prefix: 1
        }));
};
