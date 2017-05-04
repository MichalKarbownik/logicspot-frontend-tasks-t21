'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
	return () => {

		// Global variables
		const themes  = plugins.getThemes(),
			  streams = plugins.mergeStream();

		themes.forEach(name => {
			plugins.util.log(
				plugins.util.colors.green('Runing CSS Lint on') + ' '
				+ plugins.util.colors.blue(name) + ' '
				+ plugins.util.colors.green('theme...')
			);
			streams.add(require('../helper/css-lint')(gulp, plugins, config, name));
		});

		return streams;

	};
};
