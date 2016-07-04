'use strict';

var gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssmin = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	wiredep = require('wiredep').stream,
	compass = require('gulp-compass'),
	spritesmith = require('gulp.spritesmith'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	concat = require('gulp-concat'),
	filter = require('gulp-filter'),
	order = require('gulp-order'),
	mainBowerFiles = require('main-bower-files'),
	less = require('gulp-less'),
	replace = require('gulp-replace'),
	watch = require('gulp-watch'),
	rigger = require('gulp-rigger');


var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/*.js',
		style: 'src/css/style.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/sass/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};
// gulp.task('bower', function () {
//   gulp.src('./src/index.html')
//     .pipe(wiredep({
//       directory: 'src/bower_components',
//       goes: 'here'
//     }))
//     .pipe(gulp.dest('./src'));
// });


var config = {
	server: {
		baseDir: "./build"
	},
	host: 'localhost',
	port: 9000,
	logPrefix: "gulp",
	notify: false
};

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.on('end', browserSync.reload);
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.on('end', browserSync.reload);
});

gulp.task('style:build', function () {
	gulp.src('./src/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(compass({
			css: 'build/css',
			sass: 'src/sass'
		}))
		.on('error', function (error) {
			console.log(error);
			this.emit('end');
		})
		.pipe(prefixer(['last 15 versions', '> 1%', 'ie 9', 'ie 8'], { cascade: true }))
		.pipe(cssmin())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.on('end', browserSync.reload);
});

gulp.task('image:build', function () {
	return gulp.src(path.src.img)
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(path.build.img))
		.on('end', browserSync.reload);
});


gulp.task('fonts:build', function () {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('libs:copy', function () {
	gulp.src('src/bower_components/**/*.*')
		.pipe(gulp.dest('build/bower_components/'))
});

gulp.task('bootstrap:buid', function () {
	return gulp.src('src/bootstrap/less/bootstrap.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(concat('_bootstrap.scss'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/sass/'));
})







// gulp.task('libs:js', function() {
//     var vendors = mainBowerFiles({
//         paths: {
//             bowerDirectory: 'src/bower_components'
//         }
//     });
//     return gulp.src(vendors)
//         .pipe(filter('**/*.js'))
//         .pipe(order([
//             'jquery.js',
//             '*'
//         ]))
//         .pipe(concat('libs.js'))
//         .pipe(gulp.dest('build/js/'));
// })
// gulp.task('libs:css', function() {
//     var vendors = mainBowerFiles({
//         paths: {
//             bowerDirectory: 'src/bower_components'
//         }
//     });
//     return gulp.src(vendors)
//         .pipe(filter('**/*.css'))
//         .pipe(sourcemaps.init())
//         .pipe(concat('_libs.scss'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('src/sass/'));
// })

// gulp.task('libs', [
//     'libs:js',
//     'libs:css',
//     'libs:less'
// ]);

gulp.task('sprite', function () {
	var spriteData = gulp.src('src/img/icons/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: '_sprite.css',
		padding: 10
	}));
	spriteData.css.pipe(gulp.dest('./src/sass/'));
	spriteData.img.pipe(gulp.dest('./src/img/'));
});
gulp.task('replace', function () {
	gulp.src(['src/sass/_sprite.scss'])
		.pipe(replace('url(sprite.png)', 'url(../img/sprite.png)'))
		.pipe(gulp.dest('src/sass'));
});
gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build'
]);

gulp.task('watch', function () {
	watch([path.watch.html], function (event, cb) {
		gulp.start('html:build');
	});
	watch([path.watch.style], function (event, cb) {
		gulp.start('style:build');
	});
	watch([path.watch.js], function (event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function (event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function (event, cb) {
		gulp.start('fonts:build');
	});
	watch(['src/bootstrap/less/bootstrap.less'], function (event, cb) {
		gulp.start('bootstrap:build');
	});
});

// gulp.task('watch', function () {
// 	gulp.watch(path.watch.html, ['html:build']);
// 	gulp.watch(path.watch.style, ['style:build']);
// 	gulp.watch(path.watch.js, ['js:build']);
// 	gulp.watch(path.watch.img, ['image:build']);
// 	gulp.watch(path.watch.fonts, ['fonts:build']);
// 	// gulp.watch("src/bower_components/**/*", ['libs']);


// });




gulp.task('default', ['build', 'webserver', 'watch']);

