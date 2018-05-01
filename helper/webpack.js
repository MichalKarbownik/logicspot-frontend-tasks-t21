'use strict';

const path = require('path');

module.exports = function (gulp, plugins, config, name, file) { // eslint-disable-line func-names

    const theme = config.themes[name];
    const webpackConfig = require(path.resolve(theme.src + '/webpack.config.js'));

    if (!webpackConfig) return;

    return gulp.src(webpackConfig.entry.global)
        .pipe(plugins.webpack(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path));
};
