const { gulplog, ansi, spawn } = builder.packages;

async function watch() {
	const config = builder.options.themekit;

	try {
		await spawn(`${builder.cliPath}`, [
			"theme",
			"pull",
			`--store=${config.store}`,
			`--theme=${config["theme_id"]}`,
			`--path=./dist`,
			`--password=${config["password"]}`,
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
