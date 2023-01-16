const { gulp } = builder.packages;

const watchCssVariablesBuildFromSettings = () =>  {
    return gulp.watch(`./src/config/settings_schema.json`, gulp.series([
        "settings:css-variables:build"
    ]));
};

watchCssVariablesBuildFromSettings.displayName = "settings:css-variables:watch";

module.exports = watchCssVariablesBuildFromSettings;
