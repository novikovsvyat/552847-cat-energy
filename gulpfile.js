"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp")
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var del = require("del");
var run = require("run-sequence");

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))

    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))

    .pipe(server.stream());
});

gulp.task("images-jpg", function() {
  return gulp.src("source/img/**/*.jpg")
    .pipe(imagemin(imagemin.jpegtran({progressive: true})))
    .pipe(gulp.dest("source/img"));
});

gulp.task("images-png", function() {
  return gulp.src("source/img/**/*.png")
    .pipe(imagemin(imagemin.optipng({optimizationLevel: 3})))
    .pipe(gulp.dest("source/img"));
});

gulp.task("images-svg", function() {
  return gulp.src("source/img/**/*.svg")
    .pipe(imagemin(imagemin.svgo()))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function() {
  return gulp.src([
    "source/img/**/icon-fb.svg",
    "source/img/**/icon-insta.svg",
    "source/img/**/icon-vk.svg",
    "source/img/**/htmlacademy.svg"
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
})

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "sprite",
    "html",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
});
