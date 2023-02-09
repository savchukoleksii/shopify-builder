const { themePath }     = builder.helpers;
const { gulp, rename, translations }  = builder.packages;

const buildTranslations = () => {
    return gulp.src(`./src/locales/*.default.json`, {
			allowEmpty: true
		})
        .pipe(translations())
        .pipe(rename("object-translations-json.liquid"))
        .pipe(gulp.dest(themePath('./dist/snippets')));
};

buildTranslations.displayName = "translations:build";

module.exports = buildTranslations;
