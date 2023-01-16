const files         = builder.files;
const { minify }    = builder.functions.js;

const minifyJs = () => {
    return minify(files.minify.js);
}

minifyJs.displayName = "js:minify:build";

module.exports = minifyJs;
