const gulp = require('gulp'),
      sass = require('gulp-sass'),
      csso = require('gulp-csso'),
      gutil = require('gulp-util'),
      notify = require('gulp-notify'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create();

gulp.task('sass', done => {
    gulp.src('src/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(
        sass({outputStyle: 'expanded'})
            .on('error', gutil.log)
    )
    .on('error', notify.onError())
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.reload({stream: true}))
    done();
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
    gulp.watch('src/sass/**/*.sass', ['sass']);
});

