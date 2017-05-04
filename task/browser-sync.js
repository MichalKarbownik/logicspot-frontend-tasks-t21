'use strict';
module.exports = function(gulp, config, plugins) { // eslint-disable-line func-names
    return () => {
        plugins.browserSync.create();

        // Load browsersync with config from browser-sync.json
        plugins.browserSync(
            config.browserSync
        );
    };
};
