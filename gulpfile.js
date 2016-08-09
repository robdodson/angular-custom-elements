var gulp = require('gulp');
var connect = require('gulp-connect');
var protractor = require('gulp-protractor').protractor;

var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('connect', function() {
  connect.server({ port: 8000 });
});

gulp.task('default', ['connect', 'webdriver_update'], function() {
  gulp.src(['test/**/*-spec.js'])
    .pipe(protractor({
        configFile: 'protractor.conf.js',
        args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e })
});