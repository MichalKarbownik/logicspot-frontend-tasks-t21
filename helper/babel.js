'use strict';
module.exports = function (gulp, plugins, config, name, file) { // eslint-disable-line func-names
	const theme = config.themes[name],
		path = require('path'),
		srcBase = config.projectPath + 'var/view_preprocessed/logicspot' + theme.dest.replace('pub/static', ''),
		dest = [],
		pathsToClean = [],
		jsFilePattern = theme.jsFilePattern ? theme.jsFilePattern : 'web/js/**/*.js',
		disableMaps = plugins.minimist.disableMaps || false,
		production = plugins.minimist.prod || false,
		themeExclude = [...config.ignore, ...(theme.ignore ? theme.ignore : [])],
    babelConfig = Object.assign({ "presets": ["@babel/preset-env", "@babel/preset-react"] }, theme.babel || {});

	themeExclude.forEach((value, index, array) => {
    array[index] = '!' + value;
    array[index] = '!./' + value;
  });

	function adjustDestinationDirectory(file) {
		file.dirname = file.dirname.replace('web/', '');
		return file;
	}

	theme.locale.forEach(locale => {
		dest.push(config.projectPath + theme.dest + '/' + locale);
	});

  // Cleanup existing files from pub to remove symlinks
  plugins.globby.sync(file || [srcBase + '/**/*.js', ...themeExclude])
    .forEach(file => {
      theme.locale.forEach(locale => {
        plugins.fs.removeSync(
          file
            .replace(
              srcBase,
              config.projectPath + theme.dest + '/' + locale
            )
            .replace(
              new RegExp('web/([^_]*)$'),
              '$1'
            )
        );
      });
    });

	return gulp.src(
		file || [srcBase + '/' + jsFilePattern, ...themeExclude],
		{ base: srcBase }
	)
    .pipe(
      plugins.if(
        !plugins.minimist.ci,
        plugins.plumber({
          errorHandler: plugins.notify.onError('Error: <%= error.message %>')
        })
      )
    )
    .pipe(plugins.if(!disableMaps && !production, plugins.sourcemaps.init()))
    .pipe(plugins.babel(babelConfig))
    .pipe(plugins.if(production, plugins.uglify()))
    .pipe(plugins.if(!disableMaps && !production, plugins.sourcemaps.write()))
    .pipe(plugins.if(production, plugins.rename({ suffix: '.min' })))
    .pipe(plugins.rename(adjustDestinationDirectory))
    .pipe(plugins.multiDest(dest))
    .pipe(plugins.logger({
      display   : 'name',
      beforeEach: 'Theme: ' + name + ' ',
      afterEach : ' Compiled!'
    }))
    .pipe(plugins.browserSync.stream());
};
