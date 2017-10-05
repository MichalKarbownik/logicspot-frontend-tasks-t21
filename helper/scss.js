'use strict';
module.exports = function (gulp, plugins, config, name, file) { // eslint-disable-line func-names
	const theme  	= config.themes[name],
		path        = require('path'),
	    srcBase     = config.projectPath + 'var/view_preprocessed/logicspot' + theme.dest.replace('pub/static', ''),
	    stylesDir   = path.normalize(theme.stylesDir ? theme.stylesDir : 'styles'),
	    dest        = [],
		disableMaps = plugins.util.env.disableMaps || false,
		production  = plugins.util.env.prod || false,
		disableSuffix = theme.disableSuffix || false,
		postcss     = [],
		themeExclude = [...config.ignore, ...(theme.ignore ? theme.ignore: [])];

		themeExclude.forEach((value, index, array) => {
			array[index] = '!' + value;
			array[index] = '!./' + value;
		});

	if (theme.postcss) {
		theme.postcss.forEach(el => {
			postcss.push(eval(el));
		});
	} else {
		postcss.push(plugins.autoprefixer());
	}

	function adjustDestinationDirectory(file) {
		if (file.dirname.startsWith(stylesDir)) {
			file.dirname = file.dirname.replace(stylesDir, 'css');
		} else {
			file.dirname = file.dirname.replace('/' + stylesDir, '');
		}
		
		return file;
	}

	theme.locale.forEach(locale => {
		dest.push(config.projectPath + theme.dest + '/' + locale);
	});

	return gulp.src(
		file || [srcBase + '/**/*.scss', ...themeExclude],
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
		.pipe(
			plugins.sass()
			.on('error', plugins.sassError.gulpSassError(plugins.util.env.ci || false))
		)
		.pipe(plugins.if(production, plugins.postcss([plugins.cssnano({ discardUnused: { fontFace: false } })])))
		.pipe(plugins.if(postcss.length, plugins.postcss(postcss || [])))
		.pipe(plugins.if(!disableMaps && !production, plugins.sourcemaps.write()))
		.pipe(plugins.if(production && !disableSuffix, plugins.rename({ suffix: '.min' })))
		.pipe(plugins.rename(adjustDestinationDirectory))
		.pipe(plugins.multiDest(dest))
		.pipe(plugins.logger({
			display   : 'name',
			beforeEach: 'Theme: ' + name + ' ',
			afterEach : ' Compiled!'
		}))
		.pipe(plugins.browserSync.stream());

		
};
