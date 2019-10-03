const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync');
const cache = require('gulp-cache');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const babelify = require('babelify');

const markupSRC = 'app/index.html',
	  markupFiles = 'app/**/*.html',
	  markupDEST = 'dist/';

const stylesSRC = 'app/sass/main.sass',
	  stylesFiles = 'app/sass/**/*.sass',
	  stylesDEST = 'dist/css/';

const scriptsSRC = 'app/js/common.js',
	  scriptsFiles = 'app/js/**/*.js',
	  scriptsDEST = 'dist/js/';

const imgFiles = 'app/img/**/*',
	  imgDest = 'dist/img/';

const fontsFiles = 'app/fonts/**/*',
	  fontsDest = 'dist/fonts/';

gulp.task('server', () => {
	browserSync({
		server: {
			baseDir: './dist'
		},
		notify: false,
		open: false,
		ghostMode: false
	});
});

gulp.task('del-dist', async () => {
	del.sync('./dist');
});

gulp.task('clear-cache', () => {
	return cache.clearAll();
})

gulp.task('markup', () => {
	return gulp.src(markupSRC)
		.pipe( gulp.dest(markupDEST) )
		.pipe( browserSync.reload({ stream: true }) );
});

gulp.task('styles', () => {
	return gulp.src(stylesSRC)
		.pipe( sourcemaps.init() )
		.pipe( sass() )
		.pipe( autoprefixer({
			cascade: false
		}) )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( cleanCss() )
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest(stylesDEST) )
		.pipe( browserSync.stream() );
});

gulp.task('scripts', () => {
	return browserify({
		entries: [scriptsSRC]
	})
		.transform( babelify )
		.bundle()
		.pipe( source('bundle.js') )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( buffer() )
		.pipe( sourcemaps.init() )
		.pipe( uglify() )
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest(scriptsDEST) )
		.pipe( browserSync.reload({ stream: true }) );
});

gulp.task('img', () => {
	return gulp.src(imgFiles)
		.pipe( imagemin({
			interplaced: true,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()]
		}) )
		.pipe( gulp.dest(imgDest) )
		.pipe( browserSync.reload({ stream: true }) );
});

gulp.task('fonts', () => {
	return gulp.src(fontsFiles)
		.pipe( gulp.dest(fontsDest) )
		.pipe( browserSync.reload({ stream: true }) );
});

gulp.task('watch', () => {
	gulp.watch(markupFiles, gulp.parallel('markup'));
	gulp.watch(stylesFiles, gulp.parallel('styles'));
	gulp.watch(scriptsFiles, gulp.parallel('scripts'));
	gulp.watch(imgFiles, gulp.parallel('img'));
	gulp.watch(fontsFiles, gulp.parallel('fonts'));
});

gulp.task('build', gulp.parallel('markup', 'styles', 'scripts', 'img', 'fonts'));

gulp.task('default', gulp.series('build', gulp.parallel('server', 'watch')));