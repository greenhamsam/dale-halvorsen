// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

// Say hello, gulp!
gulp.task("hello", function(done) {
    console.log("It's gulping time!");
    done();
});

// Copy All HTML Pages
gulp.task("html", function() {
    return gulp
        .src("src/html/*.html")
        .pipe(gulp.dest("build"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
});

// Copy All Images
gulp.task("img", function() {
    return gulp
        .src("src/img/**/*.{png,gif,jpg}")
        .pipe(gulp.dest("build/img"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
});

// Lint Task
gulp.task("lint", function() {
    return gulp
        .src("src/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

// Compile Our Sass
gulp.task("sass", function() {
    return gulp
        .src("src/scss/*.scss")
        .pipe(sass())
        .pipe(concat("main.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
});

// Concatenate & Minify JS
gulp.task("scripts", function() {
    return gulp
        .src("src/js/*.js")
        .pipe(concat("all.js"))
        .pipe(gulp.dest("build"))
        .pipe(rename("all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

// Spin up a server
gulp.task("serve", function() {
    browserSync.init({
        server: {
            baseDir: "build",
        },
    });
});

// Watch Files For Changes
gulp.task("watch", ["serve"], function() {
    gulp.watch("src/html/*.html", ["html"]);
    gulp.watch("src/js/*.js", ["lint", "scripts"]);
    gulp.watch("src/scss/*.scss", ["sass"]);
    gulp.watch("src/img/*.{png,gif,jpg}", ["img"]);
});

// Build task
gulp.task("build", [
    "html",
    "img",
    "lint",
    "sass",
    "scripts",
]);


// Default Task
gulp.task("default", [
    "hello",
    "html",
    "img",
    "lint",
    "sass",
    "scripts",
    "watch",
    "serve",
]);
