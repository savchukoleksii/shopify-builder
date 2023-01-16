const files 			= builder.files;
const { copy }  		= builder.functions.others;
const { watch } 		= builder.helpers;
const { gulp, clean }   = builder.packages;

const copyWatch = () => {
	return watch(files.copy, (copyFiles, options = {}) => {
		function copyFile() {
			return copy(copyFiles, options);
		}

		copyFile.displayName = "copy:file";

		return copyFile;
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
