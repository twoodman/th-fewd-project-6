// require modules
const gulp = require('gulp')
    // compiles Sass & compass
const compass = require('gulp-compass')
    // minifies css
const cleanCSS = require('gulp-clean-css')
    // renames files
const rename = require('gulp-rename')
    // gulp plumber so errors dont break pipe
const plumber = require('gulp-plumber')
    // webserver & live reload
const webserver = require('gulp-webserver')

// compile Sass, minify, & output to stylesheets folder
gulp.task('sass', () => {
  gulp.src('scss/**/*.scss')
  .pipe(plumber())
  .pipe(compass({
    config_file: './config.rb',
    css: 'stylesheets',
    sass: 'scss'
  }))
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist/'))
})

// open & live reload webserver
gulp.task('reload', () => {
  gulp.src('./')
  .pipe(plumber())
  .pipe(webserver({
    open: true,
    auto: false,
    livereload: true
  }))
})

//  watch task
gulp.task('watchthis', () => {
  gulp.watch('scss/**/*.scss', ['sass'])
})

// default task
gulp.task('do', ['sass', 'watchthis', 'reload'])
