'use strict';
module.exports = function (gulp, plugins, config, name, file) { // eslint-disable-line func-names
    const theme     = config.themes[name];
    const path      = require('path');
    const srcBase   = config.projectPath + 'var/view_preprocessed/logicspot' + theme.dest.replace('pub/static', '');
    const dest      = [];

    theme.locale.forEach(locale => {
		dest.push(config.projectPath + theme.dest + '/' + locale);
	});

    const configFile = path.resolve(srcBase + '/webpack.config.js');

    if(! plugins.fs.pathExistsSync(configFile) ) {
        return gulp.src('.');
    }

    let webpackConfig = require(configFile);

    webpackConfig = {
        ...webpackConfig,
        resolve: { 
            modules: [config.projectPath, "node_modules"]
        }
    };

    return gulp.src(
        webpackConfig.entry.global,
        { base: srcBase }
    )
        .pipe(plugins.webpack(webpackConfig))
        .pipe(gulp.multiDest(dest))
        .pipe(plugins.logger({
			display   : 'name',
			beforeEach: 'Theme: ' + name + ' ',
			afterEach : ' Compiled Webpack Item!'
		}));
    
};
