'use strict';
module.exports = function(file, plugins, config, failOnError) { // eslint-disable-line func-names
	if (typeof failOnError === 'undefined') {
		failOnError = true;
	}

	const externalPath = config.projectPath + file;
	const modulePath = config.modulePath;

	// Check if file exists inside of config directory
	if (plugins.globby.sync(externalPath).length) {
		if (file.includes('yml')) {
			return plugins.yaml.safeLoad(plugins.fs.readFileSync(externalPath));
		}
		else {
			return JSON.parse(plugins.fs.readFileSync(externalPath));
		}
	}
	else if (plugins.globby.sync(modulePath + '/config/' + file).length) {
		if (file.includes('yml')) {
			return plugins.yaml.safeLoad(plugins.fs.readFileSync(modulePath + '/config/' + file));
		}
		else {
			return JSON.parse(plugins.fs.readFileSync(modulePath + '/config/' + file));
		}
	}
	else {
		if (failOnError) {
			throw new plugins.pluginError({
				'plugin' : 'config',
				'message': plugins.errorMessage('You have to create ' + file)
			})
		}
		return {};
	}
};
