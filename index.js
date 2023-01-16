#!/usr/bin/env node
const startBuilder = require("./builder");

function callback() {
	const { spawn } = builder.packages;

	const args = [
		...process.argv.splice(2, process.argv.length),
		"--gulpfile", builder.gulpFile,
		"--cwd", builder.themeRoot,
	];

	spawn.sync(`${builder.gulpPath}`, args, {
		detached: false,
		stdio: 'inherit'
	});
}

startBuilder(callback);
