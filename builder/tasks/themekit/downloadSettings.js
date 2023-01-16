const { gulplog, ansi } = builder.packages;
const { downloadSettings } = builder.functions.others

async function downloadSettingsTask() {
	try {
		await downloadSettings();
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

downloadSettingsTask.displayName = "themekit:download-settings";

module.exports = downloadSettingsTask;
