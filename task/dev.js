'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
   return () => {
      // Prevent runing inheritance task more than once
      plugins.util.env.pipeline = true;

      plugins.runSequence('inheritance', 'scripts', 'styles', () => {
		// Setup browser-sync
		plugins.browserSync.create();
		plugins.browserSync(
			config.browserSync
		);
		plugins.runSequence('watch');
      });
   };
};
