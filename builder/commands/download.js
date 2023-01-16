const themekitDownload          = require("../tasks/themekit/download");
const cliDownload				= require("../tasks/cli/pull");
const svgUpdate                 = require("../tasks/images/updateSvg");
const removeIconsFromSnippets   = require("../tasks/images/removeIconsFromSnippets");

const { gulp } 					= builder.packages;
const argv 						= builder.args;

const download = gulp.series([
	...(argv.cli ? [cliDownload] : [themekitDownload]),
    svgUpdate,
    removeIconsFromSnippets
]);

download.displayName = "download";

module.exports = download;
