let gulp = require("gulp");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let cssvars = require("postcss-simple-vars");
let nested = require("postcss-nested");
let cssImport = require("postcss-import");
let mixins = require("postcss-mixins");
let watch = require("gulp-watch");
let browserSync = require("browser-sync").create();



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