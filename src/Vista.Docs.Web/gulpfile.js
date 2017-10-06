
var basePaths = {
    src: {
        base: './',
        views: './Views',
        images: './Images',
        scripts: './Scripts',
        styles: './Styles',
        swagger: './SwaggerSrc'
    },
    dest: {
        base: '../WSVistaWebClient.Host/ApiDocsApp',
        views: '../WSVistaWebClient.Host/ApiDocsApp/Views',
        images: '../WSVistaWebClient.Host/ApiDocsApp/Images',
        scripts: '../WSVistaWebClient.Host/ApiDocsApp/Scripts',
        styles: '../WSVistaWebClient.Host/ApiDocsApp/Styles'
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
var tfsCheckout = require('gulp-tfs-checkout');
var runSequence = require('run-sequence');

gulp.task('cshtml', function () {
    return gulp.src([basePaths.src.views + '/**/*.cshtml', basePaths.src.views + '/**/*.config']).pipe(gulp.dest(basePaths.dest.views));
});

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
        .pipe(concat('Base.js'))
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
gulp.task('tfs-clean', function () {
    return gulp.src(basePaths.dest.base + "/**/*.*")
        .pipe(tfsCheckout());
});


gulp.task('unset-readonly', function () {
    return gulp.src(basePaths.dest.base + "/**/*.*")
        .pipe(print())
        .pipe(shell("attrib -r <%= file.path %> /s"));
});

gulp.task('tfs', function (done) {
    runSequence('tfs-clean','unset-readonly', done);
});
gulp.task('deploy', function (done) {
    runSequence('unset-readonly','css', 'scripts', 'swagger-css', 'swagger-scripts', 'cshtml', 'images', done);
});


gulp.task('checkout', ['tfs']);
gulp.task('default', ['deploy']);