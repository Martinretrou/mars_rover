var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var dotenv = require('dotenv');
var fs = require('fs');

const envFileExist = fs.existsSync('./.env');
if(envFileExist) {
  dotenv.config();
}

gulp.task('wiredep', function () {
  gulp.src('*.html')
    .pipe(wiredep({

    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function(){
  return gulp.src('app/scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css/'))
});

 gulp.task('default', ['watch'], function() {
   gulp.start('mini');
   gulp.start('sass');
 });

 gulp.task('watch', function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/css/*.css', ['mini'])
 });

gulp.task('mini', function () {
	gulp.src('app/css/style.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});