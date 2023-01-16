const { themePath }     = builder.helpers;
const { gulp, rename }  = builder.packages;
const { variables }     = builder.functions.styles;

const buildCssVarianblesFromSettings = () => {
    return gulp.src(`./src/config/settings_schema.json`, {
			allowEmpty: true
		})
        .pipe(variables())
        .pipe(rename("variables.css.liquid"))
        .pipe(gulp.dest(themePath('./dist/snippets')));
}

buildCssVarianblesFromSettings.displayName = "settings:css-variables:build";

module.exports = buildCssVarianblesFromSettings;
