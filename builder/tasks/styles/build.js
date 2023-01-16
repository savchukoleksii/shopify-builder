const files         = builder.files;
const { build }     = builder.functions.styles;

const buildScss = () => {
    return build(files.scss);
};

buildScss.displayName = "scss:build";

module.exports = buildScss;
