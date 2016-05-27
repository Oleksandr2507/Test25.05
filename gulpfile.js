


var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var order = require('gulp-order');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');



var b = watchify(browserify({entries: './src/javascript/app.js', extensions: ['.js'], debug: true}));

function bundle() {
    return b.transform('babelify', {presets: ['es2015', 'react']})
        .transform({global: true}, 'uglifyify')
        .bundle()
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
        'lodash.js'
    ];
    return gulp.src(vendorScripts)
        .pipe(order(vendorsOrder))
        .pipe(concat('vendorJs.js'))
        .pipe(uglify({
            preserveComments: 'all'
        }))
        .pipe(gulp.dest('./public/assets/javascript/vendor'));
});
