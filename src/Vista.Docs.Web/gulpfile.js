
var basePaths = {
    src: {
        base: './',
        images: './images',
        scripts: './scripts',
        styles: './css',
        swagger: './swagger-src'
    },
    dest: {
        base: './assets',
        images: './assets/images',
        scripts: './assets/scripts',
        styles: './assets/css'
    }
};


var scriptLibs = [
    './node_modules/jquery/dist/jquery.min.js',
    basePaths.src.scripts + '/**/*.js'
];
   

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var print = require('gulp-print');
var runSequence = require('run-sequence');

gulp.task('images', function () {
    return gulp.src([basePaths.src.images + '/**/*.*']).pipe(gulp.dest(basePaths.dest.images));
});
gulp.task('css', function () {
    return gulp.src(basePaths.src.styles + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest(basePaths.dest.styles));
});

gulp.task('scripts', function () {
    return gulp.src(scriptLibs)
        .pipe(concat('base.js'))
        .pipe(gulp.dest(basePaths.dest.scripts));
});

gulp.task('swagger-scripts', function () {
    return gulp.src(basePaths.src.swagger + '/**/*.js')
        .pipe(gulp.dest(basePaths.dest.scripts));
});
gulp.task('swagger-css', function () {
    return gulp.src(basePaths.src.swagger + '/**/*.css')
        .pipe(gulp.dest(basePaths.dest.styles));
});


gulp.task('deploy', function (done) {
    runSequence('css', 'scripts', 'swagger-css', 'swagger-scripts', 'images', done);
});

gulp.task('default', ['deploy']);