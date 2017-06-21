'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
   return () => {
		// Tasks to run when deploying to server
		plugins.util.env.pipeline = true;

		plugins.runSequence('inheritance', 'scripts', 'styles');
   };
};
