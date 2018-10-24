'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
   return () => {
      // Prevent runing inheritance task more than once
      plugins.minimist.pipeline = true;

      plugins.runSequence('inheritance', 'styles', 'scripts', () => {
		// Setup browser-sync
		plugins.browserSync.create();
		plugins.browserSync(
			config.browserSync
		);
		plugins.runSequence('watch');
      });
   };
};
