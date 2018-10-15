# Logicspot (http://logicspot.com) Frontend Tasks for Magneto 2

## Quick Start

* `npm run dev` - For local dev. Runs [browserSync](https://www.browsersync.io/) and `inheritance`, `scripts`, `styles`, `watch` tasks.
* `npm run build` - Deploy styles. Run `clean`, `inheritance`, `scripts` and `styles` tasks. Everything you should need for a deployment. See below for flags you can add to customize the output.
* `npm run build:{enviroment}` - Allows you to specfiy which enviroment to build for, the process differs slightly for each.
* `npm run clean` - Clears the Magneto caches and symlinks

All of the above tasks are set in the package.json file for each project, so can differ.

## Introduction

> This fork is currently up to date with changes in "SnowdogApps/magento2-frontools": "1.5.15",

Replaces the default Magento 2 grunt tasks to use gulp/sass/babel and all things nice!

This is a Fork of the Snowdog Apps Frontools, but modified (https://github.com/SnowdogApps/magento2-frontools)
See their README for additonal help

### Technologies Used

| Area              | Tech |
| ----------------- | -- |
| Task Runner       | Gulp |
| Package Manager   | Require JS & Bower (files are commited), opt in for Webpack |
| Styles            | SASS |
| ES Version        | ES6 (with Babel) |
| Framework         | Foundation 6.4 |

## Installation

Start of with adding this package as a dependency to your project, and setting up some scripts to run.

1. Make sure you have a frontend theme set up already
2. Copy the a `config/package.json` file in the magneto `public_html` folder. Note here espeically the `devDependencies` points to this module, and the `build` tasks point to `gulp` with slightly different options for each envrionment.
3. Also copy the `config/gulpfile.js` file into the same location, and change the development url, or any other options.
3. Define your themes in `themes.json`, you can copy the sample file in config folder of this module

4. If the location of the FE theme moves between your local and server development, you will need an additional file `themes-vender.json` which will set a theme path. You can have as many of these as you want. They can be selected using the `--config option` - e.g. `gulp deploy --config vendor` will look for `themes-vendor.json`

## Configruation

### `themes.json` avaliable options

Check `config/themes.json` to get samples
- `src` - full path to theme
- `dest` - full path to `pub/static/[theme_area]/[theme_vendor]/[theme_name]`
- `locale` - array of available locales
- `localeOverwrites` - (default `false`) set to `true` if you want to overwrite some styles for specifilc language. Remember that path to overwriting file has to be same as base file after removing `/i18n/{lang_code}`.
- `parent` - name of parent theme
- `stylesDir` - (default `styles`) path to styles directory. For `theme-blank-sass` it's `styles`. By default Magento 2 use `web/css`.
- `postcss` - (deafult `["plugins.autoprefixer()"]`) PostCSS plugins config. Have to be an array.
- `modules` - list of modules witch you want to map inside your theme
- `ignore` - array of ignore patterns

### `watcher.json` structure
Check `config/watcher.json` to get samples.
- `usePolling` - set this to `true` to successfully watch files over a network (i.e. Docker or Vagrant) or when your watcher dosen't work well. Warining, enabling this option may lead to high CPU utilization! [chokidar docs](https://github.com/paulmillr/chokidar#performance)

### Avalaible Gulp Tasks

* `scripts` - Run [Babel](https://babeljs.io/), a compiler for writing next generation JavaScript.
	* `--theme name` - Process single theme.
	* `--prod` - Production output - minifies and uglyfy code.
* `browser-sync` - Run [browserSync](https://www.browsersync.io/).
* `clean` - Removes `/pub/static` and `var/view_preprocessed` directory content
* `default` - type `gulp` to see this readme in console.
* `deploy` - Symlink or copy all static assets to `pub/static`. Runs `clean` and `inheritance` tasks.
	* `--theme name` - Specify theme to deploy.
	* `--prod` - Copy files instead of making symlinks.
* `dev` - Runs [browserSync](https://www.browsersync.io/) and `inheritance`, `scripts`, `styles`, `watch` tasks.
  * `--theme name` - Process single theme.
  * `--disableMaps` - Toggles source maps generation.
* `inheritance` - Create necessary symlinks to resolve theme styles inheritance and make the base for styles processing. You have to run in before styles compilation and after adding new files.
* `styles` - Use this task to manually trigger styles processing pipeline.
	* `--theme name` - Process single theme.
	* `--disableMaps` - Toggles source maps generation.
	* `--prod` - Production output - minifies styles and add `.min` sufix.
	* `--ci` - Enable throwing errors. Useful in CI/CD pipelines.
* `watch` - Watch for style changes and run processing tasks.
	* `--theme name` - Process single theme.
	* `--disableMaps` - Enable inline source maps generation.

### Webpack (optional)

Optinally use webpack to create a bundle that will load separately from Require JS. This means you cannot use any of Require's dependencies (such as jQuery), but it will load much faster. It also makes it easy to create separate bundles for global, category page, product page etc.

To install:

1. Copy the `config/webpack.config.js` file in `public_html` with your entries and outputs. See example below.
2. To create a global bundle add `<script src="js/global.js" src_type="path" async="async"/>` into `Magento_Theme/layout/default_head_blocks.xml`
3. To create a product page bundle add `<head><script src="js/product.js" src_type="path" async="async"/></head>` to `Magento_Catalog/layout/catalog_product_view.xml`
