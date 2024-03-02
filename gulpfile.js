const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

// função para compilar o sass
function compilaSass() {
  return gulp.src('scss/*.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserlist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream())
}

function gulpJs() {
  return gulp.src('js/scripts/*.js')
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}

gulp.task('alljs', gulpJs)


// tarefa para a função que compila o sass
gulp.task('sass', compilaSass)

// função para o broweser sync(servidor local)
function browser() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

// tarefa para a função browser-sync
gulp.task('browser-sync', browser)

// função watch, quando algum desses arquivos sofrer alteração ele chama uma função
function watch() {
  gulp.watch('scss/*.scss', gulp.series('sass'))
  gulp.watch('*.html').on('change', browserSync.reload)
  gulp.watch('js/scripts/*.js', gulpJs)
}

// tarefa da função watch
gulp.task('watch', watch)

// tarefa default, ao chamar o gulp no termial ele irá chamar essa tarefa, que ira executar em paralelo o watch, e browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'alljs'))