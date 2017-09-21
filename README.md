## Logicspot (http://logicspot.com) Frontend Tasks for Magneto 2

This repos is currently up to date with "SnowdogApps/magento2-frontools": "1.5.8",

### General Notes

Replaces the default Magento 2 grunt tasks to use gulp/sass/babel and all things nice!

This is a Fork of the Snowdog Apps Frontools, but modified (https://github.com/SnowdogApps/magento2-frontools)
See their README for additonal help

### Adding to your project

Start of with adding this package as a dependency to your project, and setting up some scripts to run.

- Create a `package.json` file:

```
{
	"name": "project-name",
	"description": "Project",
	"license": "MIT",
	"version": "1.0.0",
	"devDependencies": {
		"logicspot-frontend-tasks": "^2.0.0"
	},
	"scripts": {
		"dev":				"gulp dev --config local",
		"deploy:local":		"gulp deploy --ci",
		"deploy:dev":		"gulp deploy --ci",
		"deploy:staging":	"gulp deploy --ci --prod",
		"deploy:live":		"gulp deploy --ci --prod",
		"deploy:test":		"gulp deploy --ci --prod"
	}
}
```

- Create a `gulpfile.js` with only calls this module with some optional config

```
require('logicspot-frontend-tasks')({
    "browserSync": {
        "proxy": "https://local.dev",
        "https": true
    }
});
```

- Define your themes in `themes.json`, you can copy the sample file in config folder of this module

## `themes.json` structure

Check `config/themes.json.sample` to get samples
- `src` - full path to theme
- `dest` - full path to `pub/static/[theme_area]/[theme_vendor]/[theme_name]`
- `locale` - array of available locales
- `localeOverwrites` - (default `false`) set to `true` if you want to overwrite some styles for specifilc language. Remember that path to overwriting file has to be same as base file after removing `/i18n/{lang_code}`.
- `parent` - name of parent theme
- `stylesDir` - (default `styles`) path to styles directory. For `theme-blank-sass` it's `styles`. By default Magento 2 use `web/css`.
- `postcss` - (deafult `["plugins.autoprefixer()"]`) PostCSS plugins config. Have to be an array.
- `modules` - list of modules witch you want to map inside your theme
- `ignore` - array of ignore patterns

## Tasks list
* `scripts` - Run [Babel](https://babeljs.io/), a compiler for writing next generation JavaScript.
	* `--theme name` - Process single theme.
	* `--prod` - Production output - minifies and uglyfy code.
* `browser-sync` - Run [browserSync](https://www.browsersync.io/).
* `clean` - Removes `/pub/static` and `var/view_preprocessed` directory content
* `csslint` - Run [stylelint](https://github.com/stylelint/stylelint) based tests.
	* `--theme name` - Process single theme.
	* `--ci` - Enable throwing errors. Useful in CI/CD pipelines.
* `default` - type `gulp` to see this readme in console.
* `deploy` - Symlink or copy all static assets to `pub/static`. Runs `clean` and `inheritance` tasks.
	* `--theme name` - Specify theme to deploy.
	* `--prod` - Copy files instead of making symlinks.
* `dev` - Runs [browserSync](https://www.browsersync.io/) and `inheritance`, `babel`, `styles`, `watch` tasks.
  * `--theme name` - Process single theme.
  * `--disableLinting` - Disable SASS and CSS linting.
  * `--disableMaps` - Toggles source maps generation.
* `eslint` - Watch and run [eslint](https://github.com/adametry/gulp-eslint) on specified JS file.
	* `--file fileName` - You have to specify what file you want to lint, fileName without .js.
* `inheritance` - Create necessary symlinks to resolve theme styles inheritance and make the base for styles processing. You have to run in before styles compilation and after adding new files.
* `sasslint` - Run [sass-lint](https://github.com/sasstools/sass-lint) based tests.
	* `--theme name` - Process single theme.
	* `--ci` - Enable throwing errors. Useful in CI/CD pipelines.
* `styles` - Use this task to manually trigger styles processing pipeline.
	* `--theme name` - Process single theme.
	* `--disableMaps` - Toggles source maps generation.
	* `--prod` - Production output - minifies styles and add `.min` sufix.
	* `--ci` - Enable throwing errors. Useful in CI/CD pipelines.
* `watch` - Watch for style changes and run processing tasks.
	* `--theme name` - Process single theme.
	* `--enableLinting` - Enable SASS and CSS linting.
	* `--disableMaps` - Enable inline source maps generation.
