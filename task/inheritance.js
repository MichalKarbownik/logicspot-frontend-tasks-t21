'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
   return (resolve) => {
        // Global variables
        const themes  = plugins.getThemes(),
        	  promises = [];

        themes.forEach(name => {
            promises.push(require('../helper/inheritance-resolver')(plugins, config, name));
        });

        Promise.all(promises).then(() => {
            resolve();
        });

   };
};
