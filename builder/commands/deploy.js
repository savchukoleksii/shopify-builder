const build 			= require("./build");
const cliPush 			= require("../tasks/cli/push");
const themekitDeploy 	= require("../tasks/themekit/deploy");
const argv 			 	= builder.args;

const { gulp }      	= builder.packages;
const deploy        	= gulp.series(...[
	build,
	...(argv.cli ? [cliPush] : [themekitDeploy]),
]);
deploy.displayName  = "deploy";

module.exports = deploy;
