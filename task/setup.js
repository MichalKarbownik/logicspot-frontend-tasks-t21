'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
	return () => {

		console.log('No set up currently needed, space here for future additions');

		// // Global variables
		// const plugins              = this.opts.plugins,
		// 		config               = this.opts.configs,
		// 		path                 = require('path'),

		// 		// Create a relative symlink in project root to /vendor/snowdog/frontools
		// 		relativeDirectory    = path.relative(config.projectPath, plugins.fs.realpathSync('./')),
		// 		symlinkDirectoryName = plugins.minimist.symlink || 'tools',

		// 		// Set config files paths
		// 		configSamplesPath    = './config/',
		// 		configPath           = config.projectPath + 'dev/tools/frontools/config/';

		// try {
		// 	plugins.fs.symlinkSync(relativeDirectory, config.projectPath + '/' + symlinkDirectoryName, 'dir');

		// 	plugins.log(
		// 		plugins.ansiColors.green('Symlink created. You can now use Frontools from the "' + symlinkDirectoryName + '" directory.')
		// 	);
		// }
		// catch (error) {
		// 	plugins.log(
		// 		plugins.ansiColors.yellow(symlinkDirectoryName + ' already exists. Skipped it.')
		// 	);
		// }

		// // Copy all all non existent config files to /dev/tools/frontools/config/
		// plugins.fs.readdirSync(configSamplesPath).forEach((fileName) => {
		// 	const newFileName = fileName.replace('.sample', '');

		// 	try {
		// 		plugins.fs.copySync(configSamplesPath + fileName, configPath + newFileName, {
		// 			overwrite: false,
		// 			errorOnExist: true
		// 		});

		// 		plugins.log('File ' + fileName + ' copied to /dev/tools/frontools/config/' + newFileName);
		// 	}
		// 	catch (error) {
		// 		plugins.log(
		// 			plugins.ansiColors.yellow('File ' + newFileName + ' already exists. Skipped it.')
		// 		);
		// 	}
		// });

		// plugins.log(
		// 	plugins.ansiColors.green('Setup complete! Go to "/dev/tools/frontools/config/" directory and edit the configuration there.')
		// );

	}
};