'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
	return () => {

		// Global variables
		const themes  = plugins.getThemes(),
			  streams = plugins.mergeStream();

		// Generate all necessary symlinks before styles compilation
		plugins.runSequence('inheritance');

		// Loop through themes to compile scss or less depending on your config.json
		themes.forEach(name => {
			streams.add(require('../helper/babel')(gulp, plugins, config, name));
		});
	}
};