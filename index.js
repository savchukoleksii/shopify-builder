#!/usr/bin/env node

const builder 	= require("./builder");
const { spawn } = builder.packages;

function callback() {
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

builder(callback);
