'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
   return () => {
      // Open browser-sync session and start watchers
      plugins.runSequence('browser-sync', 'inheritance', 'watch');
   };
};
