var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var del = require('del');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var webpack = require('webpack-stream');

// Cleaning
gulp.task('clean', function(callback) {
  del('dist', callback);
});

// HTML
gulp.task('html', function() {
  return gulp.src(['src/**/*.html'])
    .pipe(plumber())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// JSON
gulp.task('json', function() {
  return gulp.src(['task/json/*.json'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/json'))
    .pipe(browserSync.stream());
});

// LESS
gulp.task('less', function() {
  return gulp.src([
    'src/less/app.less'
  ])
  .pipe(plumber())
  .pipe(less())
  .pipe(autoprefixer('last 2 version', 'ie 9'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

// Images
gulp.task('images', function() {
  return gulp.src(['src/**/*.+(gif|jpg|png)'])
    .pipe(flatten())
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});

// Webpack
gulp.task('webpack', function() {
  return gulp.src('src/js/app.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('dist/js'));
});

// Live reload
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    logLevel: 'info',
    host: 'st',
    notify: false,
    open: false,
    reloadOnRestart: true
  });
});

// Watch
gulp.task('watch', function() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/**/*.js', ['webpack']);
  gulp.watch('src/**/*.+(gif|jpg|png|swf)', ['images']);
});

// Default
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    [
      'webpack',
      'html',
      'json',
      'less',
      'images'
    ],
    'watch',
    'browserSync',
    callback
  );
});
