const files 	= builder.files;
const { copy }  = builder.functions.others;

const copyBuild = () => {
    return copy(files.copy);
}

copyBuild.displayName = "copy:build";

module.exports = copyBuild;
