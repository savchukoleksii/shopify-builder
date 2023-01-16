const path 			= require("path");
const { themeRoot } = builder;

module.exports = (themePath) => {
	return path.resolve(themeRoot, themePath);
};
