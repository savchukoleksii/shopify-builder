const files 	= builder.files;
const { svg }   = builder.functions.images;

const svgBuild = () => {
    return svg(files.svg.general);
}

svgBuild.displayName = "svg:build";

module.exports = svgBuild;
