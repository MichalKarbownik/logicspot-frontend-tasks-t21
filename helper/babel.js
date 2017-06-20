'use strict';
module.exports = function(gulp, plugins, config, name, file) { // eslint-disable-line func-names
	const theme = config.themes[name],
		path        = require('path'),
		srcBase     = config.projectPath + 'var/view_preprocessed/logicspot' + theme.dest.replace('pub/static', ''),
		dest        = [],
		jsDir   	= path.normalize(theme.jsDir ? theme.jsDir : 'web/js'),
		jsFilePattern = theme.jsFilePattern ? theme.jsFilePattern : 'web/js/**/*.js',
		disableMaps = plugins.util.env.disableMaps || false,
		production  = plugins.util.env.prod || false,
		themeExclude = [...config.ignore, ...(theme.ignore ? theme.ignore: [])],
		babelConfig = {
			presets: require('babel-preset-env')
		};

	themeExclude.forEach((value, index, array) => {
		array[index] = '!' + value;
	});

	function adjustDestinationDirectory(file) {
		// file.dirname = file.dirname.replace('web/', '');
		if (file.dirname.startsWith(jsDir)) {
			file.dirname = file.dirname.replace(jsDir, 'js');
		}
		else {
			file.dirname = file.dirname.replace('/' + jsDir, '');
		}
		return file;
	}
	
	theme.locale.forEach(locale => {
		dest.push(config.projectPath + theme.dest + '/' + locale);
	});

	return gulp.src(
		file || [srcBase + '/' + jsFilePattern, ...themeExclude],
		{ base: srcBase }
	)
		.pipe(
			plugins.if(
				!plugins.util.env.ci,
				plugins.plumber({
					errorHandler: plugins.notify.onError('Error: <%= error.message %>')
				})
			)
		)
		.pipe(plugins.if(!disableMaps && !production, plugins.sourcemaps.init()))
		.pipe(plugins.babel(babelConfig))
		.pipe(plugins.if(production, plugins.uglify()))
		.pipe(plugins.if(!disableMaps && !production, plugins.sourcemaps.write()))
		// .pipe(plugins.if(production, plugins.rename({ suffix: '.min' })))
		.pipe(plugins.rename(adjustDestinationDirectory))
		.pipe(plugins.multiDest(dest))
		.pipe(plugins.logger({
			display   : 'name',
			beforeEach: 'Theme: ' + name + ' ',
			afterEach : ' Compiled!'
		}))
		.pipe(plugins.browserSync.stream());
};
