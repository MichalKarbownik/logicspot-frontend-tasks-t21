'use strict';

module.exports = function (customConfig) {

	// Load everything in automatically except from gulp
	const gulp = require('gulp');
	const path = require('path');
	const plugins = require('gulp-load-plugins')({
		pattern: ['*', '!gulp', '!gulp-load-plugins', '!minimist', 'gulp-simple-task-loader'],
		rename: {
			'browser-sync': 'browserSync',
			'fs-extra': 'fs',
			'gulp-multi-dest': 'multiDest',
			'js-yaml': 'yaml',
			'marked-terminal': 'markedTerminal',
			'merge-stream': 'mergeStream',
			'postcss-reporter': 'reporter',
			'run-sequence': 'runSequence',
			'ansi-colors': 'ansiColors',
			'fancy-log': 'log',
			'plugin-error': 'pluginError',
            'webpack-stream': 'webpack',
		}
	});

	plugins.minimist = require('minimist')(process.argv.slice(2));

	// Set up config, using default and custom

	const defaultConfig = {};
	defaultConfig.projectPath = './';
	defaultConfig.tempPath = defaultConfig.projectPath + 'var/view_preprocessed/logicspot';
	defaultConfig.modulePath = __dirname + '/';
	defaultConfig.browserSync = {};
	defaultConfig.tasksPath = path.resolve(defaultConfig.modulePath + '/task');
	defaultConfig.ignore = ['**/vendor/**', '**/packages/**', '**/node_modules/**', '**/.idea/**', '../**/.git/*', '**/.git/**.*'];

	const config = Object.assign({}, defaultConfig, customConfig);

	// Allow the themes config to be set manaually

	if (typeof plugins.minimist.config !== "undefined") {
		config.themes = require('./helper/config-loader')('themes-' + plugins.minimist.config + '.json', plugins, config, false);
	} else {
		config.themes = require('./helper/config-loader')('themes.json', plugins, config, false);
	}

	// Any custom plugins required

	plugins.errorMessage = require('./helper/error-message')(plugins);
	plugins.getThemes = require('./helper/get-themes')(plugins, config);

	// And load all the tasks
	require('gulp-simple-task-loader')({
		taskDirectory: config.tasksPath,
		plugins: plugins,
		config: config
	}, gulp);


	// You can add custom tasks using the returned gulp
	return gulp;
};
