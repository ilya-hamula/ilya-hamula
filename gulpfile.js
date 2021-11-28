const gulp          = require('gulp'),
      {series}      = require('gulp'),
      notify        = require('gulp-notify'),
      sass          = require('gulp-sass')(require('sass')),
      sourcemaps    = require('gulp-sourcemaps'),
      autoprefixer  = require('gulp-autoprefixer'),
      browserSync   = require('browser-sync').create(),
      uglify        = require('gulp-uglify'),
      srcSass       = ['./src/sass/**/*.+(sass|scss)'],
      srcJs         = './src/js/**/*.js';

exports.serve = series(
  sassTask,
  jsTask,
  browserSyncTask,
  watchTask
);

function watchTask(cb) {
  gulp.watch(srcSass, gulp.series(sassTask));
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch(srcJs).on('change', gulp.series(jsTask));
  cb();
}

function browserSyncTask(cb){
  browserSync.init({
    server: "./",
    browser: 'chrome',
    notify: false,
    logLevel: 'info',
    logConnections: true,
    logFileChanges: true,
  });
  cb();
}

function jsTask(cb){
  gulp.src(srcJs)
    .pipe(uglify())
    .pipe((gulp.dest('./public/js/')))
    .pipe(browserSync.stream())
  cb();
}

function sassTask(cb){
  gulp.src(srcSass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError()))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream())
  cb();
}