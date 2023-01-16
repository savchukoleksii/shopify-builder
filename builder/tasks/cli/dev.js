const { gulplog, ansi, spawn } 	= builder.packages;
const kill 						= require("kill-port");

async function watch() {
	const config = builder.options.themekit;

	try {
		await kill(9292);
	} catch (error) {}

	try {
		await spawn(`${builder.cliPath}`, [
			"theme",
			"dev",
			`--store=${config.store}`,
			`--theme=${config["theme_id"]}`,
			`--path=./dist`,
			'--live-reload=off',
			'--ignore=config/settings_data.json'
		], {
			detached: false,
			stdio: 'inherit',
		});
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

watch.displayName = "cli:dev";

module.exports = watch;
