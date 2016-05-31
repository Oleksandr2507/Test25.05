


var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var order = require('gulp-order');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var exorcist = require('exorcist');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var glob = require('glob');




//var b = watchify(browserify({entries: glob.sync('./src/javascript/**/*.js'), extensions: ['.js'], debug: true}));
var b = browserify({entries: glob.sync('./src/javascript/**/*.js'), extensions: ['.js'], debug: true});

function bundle() {
    return b.transform('babelify', {presets: ['es2015', 'react']})
        .transform({global: true}, 'uglifyify')
        .bundle()
        .pipe(exorcist('./public/assets/javascript/bundle.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/assets/javascript/'));
}

gulp.task('js', bundle);

b.on('update', bundle);


gulp.task('vendors', function() {
    var vendorScripts = mainBowerFiles().filter(function (filename) {
        return filename.match(/.+\._?js$/)
    });
    var vendorsOrder = [
        'angular.js',
        'angular-route.js',
        'jquery.js',
        'jquery-ui.js',
        'lodash.js',
        'moment.js',
        'moment-with-locales.js',
        'moment-timezone-with-data.js',
        '**/*.js'
    ];
    return gulp.src(vendorScripts)
        .pipe(order(vendorsOrder))
        .pipe(concat('vendorJs.js'))
        .pipe(uglify({
            preserveComments: 'all'
        }))
        .pipe(gulp.dest('./public/assets/javascript/vendor'));
});

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/assets/stylesheets/'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/scss/*.scss', ['sass']);
});

gulp.task('build', function() {
    runSequence('js','vendors', 'sass', 'copy-html');
});

gulp.task('copy-html', function(){
    return gulp.src('./src/views/*.html')
        .pipe(gulp.dest('./public/assets/views/'));
});

