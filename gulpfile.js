/**
 * Created by wins on 2016-05-24.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', () =>
	gulp.src('src/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		// .pipe(uglify())
		.pipe(gulp.dest(''))
);