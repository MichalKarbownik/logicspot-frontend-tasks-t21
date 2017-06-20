'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
    return function() {
        // Display formatted readme.md
        plugins.marked.setOptions({
            renderer: new plugins.markedTerminal()
        });

        // eslint-disable-next-line no-console
        console.log(plugins.marked(plugins.fs.readFileSync(config.modulePath + 'README.md', 'UTF-8')));
   }
};
