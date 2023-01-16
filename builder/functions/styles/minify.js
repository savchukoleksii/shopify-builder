const files = builder.files;
const {
    gulp,
    rename,
    postcss,
    cssnano
} = builder.packages;

module.exports = (cssFiles = files.minify.css, options = {}) => {
    return new Promise((resolve, reject) => {
        return gulp.src(cssFiles, options)
            .pipe(postcss([
                cssnano()
            ]))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(files.compileOutput))
            .on("end", resolve)
            .on("error", reject);
    });
};
