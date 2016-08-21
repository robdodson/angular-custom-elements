var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var umd = require('gulp-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var protractor = require('gulp-protractor').protractor;

var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', ['clean'], function() {
  return gulp.src([
      'ce-bind.module.js',
      'ce-interpolated.directive.js',
      'ce-one-way.directive.js'
    ])
    .pipe(concat('ce-bind.js'))
    .pipe(umd({
      dependencies: function(file) {
        return [{ name: 'angular' }];
      },
      exports: function(file) {
        return "'robdodson.ce-bind'";
      },
      namespace: function(file) {
        return 'returnExports';
      }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('ce-bind.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build', 'webdriver_update'], function() {
  connect.server({ port: 8000 });

  gulp.src(['test/**/*-spec.js'])
    .pipe(protractor({
        configFile: 'protractor.conf.js',
        args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e })
    .on('close', function() { connect.serverClose(); })
});