'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
   return () => {
        // Global variables
        const themes  = plugins.getThemes();

        themes.forEach(name => {
            require('../helper/inheritance-resolver')(plugins, config, name);
        });

   };
};
