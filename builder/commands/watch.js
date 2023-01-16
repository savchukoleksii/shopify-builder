const svgWatch 				= require("../watchers/images/svg");
const watchScssCompile 		= require("../watchers/styles/build");
const copyWatch 			= require("../watchers/others/copy");
const copyTemplatesWatch 	= require("../watchers/others/copyTemplates");
const translationsWatch 	= require("../watchers/others/translations");
const settingsWatch 		= require("../watchers/others/settings");
const configWatch 			= require("../watchers/others/config");
const server 				= require("../tasks/others/server");
const themekitWatch 		= require("../tasks/themekit/watch");
const build 				= require("../commands/build");

const cliDev				= require("../tasks/cli/dev");

const path					= require("path");
const fs					= require("fs");
const { gulp }      		= builder.packages;
const { themeRoot }			= builder;
const files         		= builder.files;
const argv 					= builder.args;

const watch = () => {
    const tasks = gulp.parallel(
        svgWatch,
        watchScssCompile,
        copyWatch,
		copyTemplatesWatch,
        translationsWatch,
        settingsWatch,
        configWatch,
		...(argv.cli ? [cliDev] : [themekitWatch]),
        server,
    );

    const dir = path.resolve(themeRoot, files.themekit.watch);
    if (fs.existsSync(dir)) {
        return tasks;
    }

    return gulp.series(build, tasks);
};

watch.displayName   = "watch";
module.exports      = watch();
