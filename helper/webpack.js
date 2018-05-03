'use strict';
module.exports = function (gulp, plugins, config, name, file) { // eslint-disable-line func-names
    const theme     = config.themes[name];
    const path      = require('path');
    const srcBase   = config.projectPath + 'var/view_preprocessed/logicspot' + theme.dest.replace('pub/static', '');
    const dest      = [];

    theme.locale.forEach(locale => {
        dest.push(config.projectPath + theme.dest + '/' + locale + '/js');
    });

    let webpackConfig = path.resolve(config.projectPath + '/webpack.config.js');

    if(! plugins.fs.pathExistsSync(webpackConfig) ) {
        return gulp.src('.');
    }

    webpackConfig = require(webpackConfig)(srcBase);

    return gulp.src(
        webpackConfig.entry.global,
        { base: srcBase }
    )
        .pipe(plugins.webpackStream(webpackConfig))
        .pipe(plugins.multiDest(dest))
        .pipe(plugins.logger({
            display   : 'name',
            beforeEach: 'Theme: ' + name + ' ',
            afterEach : ' Compiled Webpack Item!'
        }));

};
