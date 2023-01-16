const files         = builder.files;
const { minify }    = builder.functions.styles;

const buildScssMinify = () => {
    return minify(files.minify.css);
}

buildScssMinify.displayName = "scss:minify:build";

module.exports = buildScssMinify;
