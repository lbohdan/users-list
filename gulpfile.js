//
// ******* Configuration and loading third party components *******
//

/**
 * Load required components
 */
var concat = require('gulp-concat');
var config = require('./build.config');
var connect = require('gulp-connect');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var less = require('gulp-less');
var merge2 = require('merge2');
var minifyHtml = require('gulp-htmlmin');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var vinylPaths = require('vinyl-paths');

/**
 * Set up configuration
 */
var isForTesting = false;

//
// ******* Tasks *******
//

/**
 * Clean build directory
 */
gulp.task('clean', function () {
    return gulp.src(config.build_dir)
        .pipe(vinylPaths(del));
});

/**
 * Build app.css (include all project css files)
 */
gulp.task('app.css', function () {
    var distFolder = config.assets_dir + '/css';

    var task = gulp
        .src(config.app_files.less_files)
        .pipe(concat(config.output_files.app.css))
        .pipe(less())
        .pipe(gulp.dest(distFolder));

    return task;
});

/**
 * Build app.js (include all project js files and templates)
 */
gulp.task('app.js', function () {
    var distFolder = config.assets_dir + '/js';

    var task = gulp
        .src(config.app_files.js)
        .pipe(concat(config.output_files.app.js))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(distFolder));

    return task;
});

/**
 * Build index.html
 */
gulp.task('index.html', function () {
    var task = gulp.src(config.app_files.html)
        .pipe(minifyHtml({
            removeComments: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true
        }))
        .pipe(gulp.dest(config.build_dir));

    return task;
});

/**
 * Web-server
 */
gulp.task('web-server', function() {
    connect.server({
        root: config.source_dir
    });
});

/**
 * Lint source code
 */
gulp.task('lint', function () {
    return gulp.src(config.app_files.js)
        .pipe(eslint())
        .pipe(eslint.format('compact'))
        .pipe(eslint.failAfterError());
});

/**
 * Watch for changes and build needed sources
 * Task for development environment only
 */
gulp.task('watcher', function () {
    gulp.watch(config.app_files.less_files, function () {
        return runSequence('app.css');
    });
    gutil.log('Watching', gutil.colors.yellow('LESS'), 'files');

    gulp.watch(config.app_files.js, function () {
        return runSequence('app.js');
    });
    gutil.log('Watching', gutil.colors.yellow('JavaScript'), 'files');

    gulp.watch(config.app_files.html, function () {
        return runSequence('index.html');
    });
    gutil.log('Watching', gutil.colors.yellow('HTML'), 'files');
});

//
// ******* Task chains *******
//

/**
 * Default task
 */
gulp.task('default', function () {
    runSequence('clean', 'lint', 'app.css', 'app.js', 'web-server');
});

/**
 * Build project, watch for changes and build needed sources
 * Task for development environment only
 */
gulp.task('watch', function () {
    runSequence('default', 'index.html', 'watcher');
});
