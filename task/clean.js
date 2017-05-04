'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
   return () => {

      // Remove all files under pub/static, except .htaccess
      return gulp.src([
         config.projectPath + 'pub/static/*',
         config.projectPath + 'var/view_preprocessed/*',
         '!' + config.projectPath + 'pub/static/.htaccess',
      ], { read: false })
      .pipe(plugins.rimraf({ force: true }));
   
   }
};
