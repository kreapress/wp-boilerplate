var gulp = require('gulp'),
    // css
    compass = require('gulp-compass'),
    autoprefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    // js
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    strip = require('gulp-strip-debug'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    // images
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    // other
    util = require('gulp-util'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    // live reload
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),
    // sass
    sassDir = 'assets/styles',
    targetCssDir = 'public/styles',
    // js
    jsDir = 'assets/js',
    targetJsDir = 'public/js',
    // img
    imgDir = 'assets/img/**/*',
    targetImgDir = 'public/img';

gulp.task('compass', function() {
    gulp.src(sassDir + '/**/*.sass')
        .pipe(compass({
            config_file: './config.rb',
            sass: 'assets/styles',
            css: 'public/styles',
            image: 'assets/img'
        }))
        .pipe(autoprefix('last 4 version'))
        .pipe(gulp.dest(targetCssDir));
});

gulp.task('js', function() {
    gulp.src([jsDir + '/main.js', jsDir + '/**/*.js'])
        .pipe(concat('functions.min.js'))
        .pipe(strip())
        .pipe(uglify())
        .pipe(gulp.dest(targetJsDir));
});

gulp.task('img', function() {
    gulp.src(imgDir)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(targetImgDir));
});

gulp.task('clean', function() {
  return gulp.src([targetCssDir, targetJsDir, targetImgDir], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(sassDir + '/**/*.sass', ['compass']);
    gulp.watch(jsDir + '/**/*.js', ['js']);
    gulp.watch(imgDir + '/**/*', ['img']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('compass', 'js', 'img', 'watch');
});