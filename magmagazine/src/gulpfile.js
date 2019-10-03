const	gulp = require('gulp'),
		rigger = require('gulp-rigger'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		minifyJs = require('gulp-babel-minify'),
		cleanCss = require('gulp-clean-css'),
		htmlmin = require('gulp-htmlmin'),
		del = require('del'),
		sourcemaps = require('gulp-sourcemaps'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		cache = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		streamify = require('gulp-streamify'),
		rename = require('gulp-rename'),
		buffer = require('vinyl-buffer');

gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
		ghostMode: false,
		open: false
	});
});

gulp.task('styles', () => {
	return gulp.src('app/sass/main.sass')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 15 versions'],
			cascade: false
		}))
		.pipe(cleanCss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', () => {
	return browserify({
		entries: ['app/js/common.js'],
	})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(minifyJs())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('code', () => {
	return gulp.src('app/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img', () => {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interplaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img/'));
});

gulp.task('fonts', () => {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('clean', async () => {
	return del.sync('dist');
});

gulp.task('clear-cache', async (callback) => {
	return cache.clearAll();
});

gulp.task('build', gulp.parallel('styles', 'scripts', 'code', 'img', 'fonts'));

gulp.task('watch', () => {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch('app/js/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/**/*.html', gulp.parallel('code'));
	gulp.watch('app/img/**/*', gulp.parallel('img'));
	gulp.watch('app/fonts/**/*', gulp.parallel('fonts'));
});

gulp.task('default', gulp.series('build', gulp.parallel('browser-sync', 'watch')));