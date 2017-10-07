
var basePaths = {
    src: {
        base: './',
        images: './images',
        scripts: './scripts',
        styles: './css',
        swagger: './swagger-src',
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
    './node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.js'
];

var cssLibs = [
    './node_modules/bootstrap/dist/bootstrap.min.css',
    './node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.css',
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

gulp.task('css-libs', function () {
    return gulp.src(cssLibs)
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(basePaths.dest.styles));
});

gulp.task('css', function () {
    return gulp.src(basePaths.src.styles + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest(basePaths.dest.styles));
});

gulp.task('scripts-libs', function () {
    return gulp.src(scriptLibs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(basePaths.dest.scripts));
});

gulp.task('scripts', function () {
    return gulp.src(basePaths.src.scripts + '/**/*.js')
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
gulp.task('unset-readonly', function () {
    return gulp.src(basePaths.dest.base + "/**/*.*")
        .pipe(print())
        .pipe(shell("attrib -r <%= file.path %> /s"));
});

gulp.task('deploy', function (done) {
    runSequence('unset-readonly', 'css-libs','css', 'scripts-libs','scripts', 'swagger-css', 'swagger-scripts', 'images', done);
});

gulp.task('default', ['deploy']);