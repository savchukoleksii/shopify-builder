const files             = builder.files;
const { gulp }          = builder.packages;
const { minify }        = builder.functions.styles;
const { errorLogger }   = builder.helpers;

const watchScssMinify = async () => {
    return gulp.watch(files.minify.css).on("all", function (event, files) {
        gulp.series(...[
            minify(files)
        ])(errorLogger);
    });
};

watchScssMinify.displayName = "scss:minify:watch";

module.exports = watchScssMinify;
