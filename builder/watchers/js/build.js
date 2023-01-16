const files             = builder.files;
const { gulp }          = builder.packages;
const { build }         = builder.functions.js;
const { errorLogger }   = builder.helpers;

const jsWatch = async () => {
    return gulp.watch(files.js).on("all", function (event, file) {
        gulp.series([
            build(`./${file.replace(/\\/g, "/")}`)
        ])(errorLogger);
    });
};

jsWatch.displayName = "js:watch";

module.exports = jsWatch;
