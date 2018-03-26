'use strict';
module.exports = function(plugins) { // eslint-disable-line func-names
    return (message) => { // eslint-disable-line func-names
	   const lineLength = message.length > 50 ? 50 : message.length;
	   return plugins.ansiColors.red('\n' + '='.repeat(lineLength) + ' \n')
	       + plugins.ansiColors.yellow(message)
	       + plugins.ansiColors.red('\n' + '='.repeat(lineLength))
    }
};
