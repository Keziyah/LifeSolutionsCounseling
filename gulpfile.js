let gulp = require("gulp");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let cssvars = require("postcss-simple-vars");
let nested = require("postcss-nested");
let cssImport = require("postcss-import");
let mixins = require("postcss-mixins");
let watch = require("gulp-watch");
let browserSync = require("browser-sync").create();

var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');





gulp.task("styles", function() {
  return gulp.src("./app/assets/styles/styles.css")
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
  .on("error", function(errorInfo) {
    console.log(errorInfo.toString()); //lets us know what's wrong
    this.emit("end"); //this finishes gulp tasks even if there's an error
  })
  .pipe(gulp.dest("./app/temp/styles"));
});

gulp.task("watch", function() {
    browserSync.init({
      notify: false, //stops the black notify button from apperaing
      server: {
        baseDir: "app"
      }
    });

  watch("./app/index.html", function() {
    browserSync.reload();   
  });

  watch("./app/assets/src/*.js", function() {
    browserSync.reload();   
  });

  watch("./app/assets/styles/**/*.css", function() {
    gulp.start("cssInject"); 
  });
});

gulp.task("cssInject", ["styles"],  function() {
  return gulp.src("./app/temp/styles/styles.css")
  .pipe(browserSync.stream());
});

//Create a dist folder for production, then run these tasks
gulp.task('useref', function(){ //concatenates all js files into one
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify())) //if it's a js file, use uglify to minify it
    .pipe(gulpIf('*.css', cssnano())) //if it's a css file, use cssnano to minify it
    .pipe(gulp.dest('dist'))
});

//Optimize the images (and don't run this process on images that have already done it)
gulp.task('images', function(){
  return gulp.src('app/assets/images/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() { //Clean out the dist folder
  return del.sync('dist');
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['useref', 'images'],
    callback
  )
})