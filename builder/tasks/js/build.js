const files     = builder.files;
const { build } = builder.functions.js;

const buildJs = () => {
    return build(files.js);
}

buildJs.displayName = "js:build";

module.exports = buildJs;
