var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    resolveDependencies = require('gulp-resolve-dependencies'),
    concat = require('gulp-concat'),
    jsHint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imageMin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    // source and distribution folder
    source = 'develope/',
    dest = 'dist/',
    // Bootstrap scss source
    bsRoot = { in : './node_modules/bootstrap/' },
    // css source file: .scss files
    scss = { in : source + 'scss/main.scss',
        out: dest + 'css/',
        watch: source + 'scss/**/*',
        sassOpts: {
            outputStyle: 'expanded',
            precison: 3,
            errLogToConsole: true,
            includePaths: [bsRoot.in + 'scss']
        }
    },
    js = { in : source + 'js/main.js',
        out: dest + 'js/',
        watch: source + 'js/**/*',
        pattern: /\*= require [\s-]*(.*\.js)/g
    },
    img = { in : source + 'img/*',
        out: dest + 'img/',
        watch: source + 'img/*',
    };
// compile html
gulp.task('html', function() {
    return gulp
        .src(source + '*.html')
        .pipe(gulp.dest(dest));
});
// compile styles
gulp.task('styles', function() {
    return gulp
        .src([scss.in])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass(scss.sassOpts))
        .pipe(autoprefix())
        .pipe(gulp.dest(scss.out))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(scss.out))
        .pipe(browserSync.reload({ stream: true }));
});
// compile scripts
gulp.task('scripts', function() {
    gulp.src([js.in])
        .pipe(resolveDependencies({
            pattern: js.pattern
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(concat('main.js'))
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(jsHint())
        .pipe(jsHint.reporter('default'))
        .pipe(gulp.dest(js.out))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(js.out))
        .pipe(browserSync.reload({ stream: true }));
});
// compile images
gulp.task('images', function() {
    return gulp
        .src([img.in])
        .pipe(cache(imageMin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(img.out))
        .pipe(browserSync.reload({ stream: true }));
});
// run server
gulp.task('serve', function() {
    browserSync.init({
        notify: true,
        server: {
            baseDir: 'dist/'
        },
        'browser': ['chrome']
    });
});

gulp.task('clean', function() {
    return del(['dist/**']);
});

// default task
gulp.task('default', ['html', 'styles', 'scripts', 'images'], function() {
    gulp.watch(source + '*.html', ['html']).on('change', browserSync.reload);
    gulp.watch(scss.watch, ['styles']);
    gulp.watch(js.watch, ['scripts']);
    gulp.watch(img.watch, ['images']);
    gulp.start('serve');
});
