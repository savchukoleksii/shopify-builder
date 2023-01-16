const removeSettingsFromJsonTemplates = require("../../packages/removeSettingsFromJsonTemplates")
const { gulp } = builder.packages;
const { themePath } = builder.helpers;
const settingsDir = builder.files.settingsDir;

module.exports = (copyFiles = `./${settingsDir}/templates/*.json`, options = {}) => {
	return gulp.src(copyFiles, {
		allowEmpty: true,
		...options,
	})
	.pipe(removeSettingsFromJsonTemplates())
	.pipe(gulp.dest(themePath("./src/templates")))
};
