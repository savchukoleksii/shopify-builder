const buildScss         = require("../tasks/styles/build");
const buildScssMinify   = require("../tasks/styles/minify");
const buildJs           = require("../tasks/js/build");
const buildTranslations = require("../tasks/others/translations");
const buildCssVarianblesFromSettings = require("../tasks/styles/variables");
const copyBuild         = require("../tasks/others/copy");
const copyRequired      = require("../tasks/others/copyRequired");
const svgBuild          = require("../tasks/images/svg");
const minifyJs          = require("../tasks/js/minify");
const clearThemekitWorkingDirectory = require("../tasks/others/clearThemekitWorkingDirectory");

const { gulp } = builder.packages;

const build = gulp.series([
    clearThemekitWorkingDirectory,
    gulp.parallel(
        gulp.series(
			buildScss,
			buildScssMinify,
		),
        gulp.series(
            buildJs,
            minifyJs
        ),
        buildTranslations,
        buildCssVarianblesFromSettings
    ),
    copyBuild,
	copyRequired,
    svgBuild,
]);

build.displayName = "build";

module.exports = build;
