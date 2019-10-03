const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  browserSync = require('browser-sync'),
	  browserify = require('browserify'),
	  uglify = require('gulp-uglify'),
	  cleanCss = require('gulp-clean-css'),
	  del = require('del'),
	  babelify = require('babelify'),
	  imagemin = require('gulp-imagemin'),
	  pngquant = require('imagemin-pngquant'),
	  autoprefixer = require('gulp-autoprefixer'),
	  source = require('vinyl-source-stream'),
	  buffer = require('vinyl-buffer'),
	  rigger = require('gulp-rigger'),
	  sourcemaps = require('gulp-sourcemaps');

const path = {
	dist: {
		markup: 'dist/',
		styles: 'dist/css/',
		scripts: 'dist/js/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src: {
		markup: 'app/*.html',
		styles: 'app/sass/main.sass',
		scripts: 'app/js/main.js',
		img: 'app/img/**/*',
		fonts: 'app/fonts/**/*'
	},
	watch: {
		markup: 'app/**/*.html',
		styles: 'app/sass/**/*.sass',
		scripts: 'app/js/**/*.js',
		img: 'app/img/**/*',
		fonts: 'app/fonts/**/*'
	}
};

gulp.task('webserver', () => {
	browserSync({
		server: {
			baseDir: './dist'
		},
		ghostMode: false,
		open: false,
		notify: false
	});
});

gulp.task('del-dist', async () => {
	del.sync('dist');
});

gulp.task('markup', () => {
	return gulp.src(path.src.markup)
		.pipe(rigger())
		.pipe(gulp.dest(path.dist.markup))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', () => {
	return gulp.src(path.src.styles)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.dist.styles))
		.pipe(browserSync.stream());
});

gulp.task('scripts', () => {
	return browserify({
		entries: [path.src.scripts]
	})
		.transform(babelify)
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.dist.scripts))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img', () => {
	return gulp.src(path.src.img)
		.pipe(imagemin({
			interplace: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.dist.img))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', () => {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dist.fonts))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', () => {
	gulp.watch([path.watch.markup], gulp.parallel('markup'));
	gulp.watch([path.watch.styles], gulp.parallel('styles'));
	gulp.watch([path.watch.scripts], gulp.parallel('scripts'));
	gulp.watch([path.watch.img], gulp.parallel('img'));
	gulp.watch([path.watch.fonts], gulp.parallel('fonts'));
});

gulp.task('build', gulp.parallel('markup', 'styles', 'scripts', 'img', 'fonts'));

gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));