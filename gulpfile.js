
const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass');


const scssCompiler = gulpSass(sass);
gulp.task('js', () => {
    return gulp.src('./src/index.js')
        .pipe(gulp.dest('./dest/js'));
});

gulp.task('styles', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(scssCompiler().on('error', scssCompiler.logError))
        .pipe(gulp.dest('./dest/css'))
});

gulp.task('watch', () => {
    return gulp.watch('./src/**/*', gulp.series('styles', 'js'))
});
