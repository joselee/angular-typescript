"use strict";

let gulp = require('gulp');
let ts = require('gulp-typescript');
let less = require('gulp-less');
let autoprefixer = require('gulp-autoprefixer');
let templateCache = require('gulp-angular-templatecache');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
let insert = require('gulp-insert');
let tsProject = ts.createProject('tsconfig.json');
let npmPackage = require('./package.json');

gulp.task('index', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('views', () => {
    return gulp.src('src/scripts/**/*.html')
        .pipe(templateCache('appTemplates.js', {
            standalone: true,
            module: 'appTemplates'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', () => {
    let files = [
        'node_modules/lodash/dist/lodash.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/moment/moment.js',
        'node_modules/almond/almond.js',
    ];

    return gulp.src(files)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('ts', () => {
    let tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js
        .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
    return gulp.src('src/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera >= 12.1', 'ie >= 9'],
            cascade:false,
            remove:false
        }))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('version', () => {
    let versionInfo = `/*
    Version: ${npmPackage.version}
    Release date: ${new Date()}\n*/\n\n`;
    return gulp.src('dist/app.js')
        .pipe(insert.prepend(versionInfo))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['index', 'libs', 'views', 'ts', 'less'], () => {
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/**/*.html', ['views']);
    gulp.watch('src/**/*.ts', ['ts']);
    gulp.watch('src/**/*.less', ['less']);
});