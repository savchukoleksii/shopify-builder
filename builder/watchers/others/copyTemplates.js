const files 								= builder.files;
const {
	mergeSettingsFromDeploymentTheme,
	downloadSettings,
} 	= builder.functions.others;
const { watch } 		= builder.helpers;
const { gulp, clean }   = builder.packages;

const copyWatch = () => {
	return watch(files.copyJsonTemplates, (copyFiles, options = {}) => {
		function downloadFile() {
			return downloadSettings(copyFiles.replace("./src/", ""));
		}

		downloadFile.displayName = "themekit:download-settings";

		function mergeSettingsFromDeploymentThemeTask() {
			return mergeSettingsFromDeploymentTheme(copyFiles);
		}

		mergeSettingsFromDeploymentThemeTask.displayName = "themekit:merge-settings-from-deployment-theme";

		const copy = gulp.series(
			downloadFile,
			mergeSettingsFromDeploymentThemeTask
		);

		copy.displayName = "copy:file";

		return copy;
	}, (deleteFiles) => {
		function removeFiles() {
			return gulp.src(deleteFiles)
				.pipe(clean({
					force: true,
					allowEmpty: true
				}));
		}

		removeFiles.displayName = "remove:file";

		return removeFiles;
	});
};

copyWatch.displayName = "copy:watch";

module.exports = copyWatch;
