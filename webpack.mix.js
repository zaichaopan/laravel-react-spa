let mix = require('laravel-mix');

require('laravel-mix-tailwind');
require('laravel-mix-purgecss');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .purgeCss()
  .tailwind('tailwind.config.js')
  .webpackConfig({
    externals: [
      'child_process'
    ],
    node: {
      fs: 'empty'
    }
  }).sourceMaps();
