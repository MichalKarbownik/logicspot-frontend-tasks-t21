'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
	return () => {

		if(!plugins.util.env.prod) return;

		// Global variables
		const themes  = plugins.getThemes(),
			  streams = plugins.mergeStream();
			
		// Loop through themes to compile scss or less depending on your config.json
		themes.forEach(name => {
			streams.add(require('../helper/uglify')(gulp, plugins, config, name));
		});

		return streams;

	}
};
