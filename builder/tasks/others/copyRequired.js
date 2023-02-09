const files 	= builder.files;
const { copy }  = builder.functions.others;

const copyRequired = () => {
    return copy([
		...files.copyRequired,
	], {}, {
		prefix: 4
	});
}

copyRequired.displayName = "copy:required";

module.exports = copyRequired;
