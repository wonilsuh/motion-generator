const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("src/index.js")
  	.pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env'],
        plugins: [
        	"transform-runtime",
        	"transform-es2015-destructuring",
        	"transform-object-rest-spread"
        ]
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist"));
});
