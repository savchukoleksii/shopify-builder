const { themeRoot }	= builder;
const glob			= require('glob');
const path  		= require("path");

module.exports = (files) => {
	const filepath = path.join(themeRoot, files).replace(/\\/g, "/");

	return glob.sync(filepath).reduce(function(entries, entry){
		const parsed_entry = path.parse(entry);
		const directory = path.basename(parsed_entry.dir).toLowerCase();

		return {
			...entries,
			[`${directory !== "scripts" ? `${directory}-` : ''}${parsed_entry.name.replace("/\./g", '-')}`]: entry
		};
	}, {});
};
