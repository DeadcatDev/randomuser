/**
 * Created by wins on 2016-05-24.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');

gulp.task('rebuildjs', () =>
	gulp.src('src/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		// .pipe(uglify())
		.pipe(gulp.dest(''))
);

gulp.task('watch', ['rebuildjs'], function(){
	gulp.watch(['src/*.js', 'demo/app.js'], ['default']);
});

gulp.task('restart', function(){
	nodemon({
		script: './server.js',
		env: { 'NODE_ENV': 'development' },
		ignore: ['public/dist/']
	})
	//have nodemon run watch on start
		.on('start', ['watch-public']);
});

gulp.task('default', ['rebuildjs'], function(){
	nodemon({
		script: 'demo/app.js',
		env: { 'NODE_ENV': 'development' },
		ignore: ['index.js']
	})
});

