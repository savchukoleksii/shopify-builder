const { removeSettingsFromJsonTemplates } = builder.functions.others;
const settingsDir = builder.files.settingsDir;

const removeSettingsFromJsonTemplatesTask = () => {
	return removeSettingsFromJsonTemplates(`${settingsDir}/templates/*.json`);
};

removeSettingsFromJsonTemplatesTask.displayName = "themekit:remove-settings-from-templates";

module.exports = removeSettingsFromJsonTemplatesTask;
