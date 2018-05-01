'use strict';

const path = require('path');

module.exports = function (gulp, plugins, config, name, file) { // eslint-disable-line func-names

    const webpackConfig = require(path.resolve(config.projectPath + 'webpack.config.js'));

    if (!webpackConfig) return gulp;

    return gulp.src(webpackConfig.entry.global)
        .pipe(plugins.webpack(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path));
};
