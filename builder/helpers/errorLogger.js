const { ansi, gulplog } = builder.packages;

module.exports = function (error) {
    if(!error) {
        return;
    }

    gulplog.error(ansi.red(error.message));
};
