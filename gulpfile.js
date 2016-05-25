


var gulp  = require('gulp'),
    gutil = require('gulp-util');
    jshint = require('gulp-jshint'); //makes styled reports in terminal
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    concat = require('gulp-concat');
// create a default task and just log a message
gulp.task('default', ['watch'], function() {
    return gutil.log('Gulp is running!')
});
gulp.task('copyHtml', function () {
    gulp.src('src/*.html').pipe(gulp.dest('public'));
});

//run jshint task when any file in src/javascript is changed
gulp.task('watch', function () {
    gulp.watch('src/javascript/**/*.js', ['jshint']);
    gulp.watch('src/scss/**/*.scss', ['build-css']);
});

gulp.task('jshint', function () {
    return gulp.src('src/javscript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
    //return gulp.src('src/scss/**/*.scss') //where to get scss
    return gulp.src('src/scss/**/styles.scss')
        .pipe(sourcemaps.init()) //Process the original sources
            .pipe(sass()) //compile to css
        .pipe(sourcemaps.write()) // Add the map to modified source. E.g., one can find, from which part of original code is a part of modified code
        .pipe(gulp.dest('public/assets/stylesheets')); //where to put css
});

gulp.task('build-js', function() {
    return gulp.src('src/javascript/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            // only uglify if gulp is run with '--type production'
            .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/javascript'));
});