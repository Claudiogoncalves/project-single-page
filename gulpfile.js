//chamando os arquivos para uso no projeto
var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var sass = require("gulp-sass");
var notify = require("gulp-notify");

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./source/sass/**/*.scss')
        //comprimindo css
		.pipe(sass({outputStyle:'compressed'}))
        //identificando momento do erro e mostrando msg de alerta
		.on('error', notify.onError({ title: 'Erro ao compilar', message: '<%= error.message %>'}))
		.pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('buildjs', function() {
    return gulp.src([
        './source/components/jquery/dist/jquery.js', 
        './source/components/jquery-mobile/jquery.mobile.custom.js'
        ])
    .pipe(gulp.dest('./dist/js'))
});

//movendo fonts para pasta dist 
gulp.task('move-fonts', function() {
    return gulp.src('./source/components/components-font-awesome/fonts/**')
        .pipe(gulp.dest('./dist/fonts'));
})

//movendo arquivos js para pasta dist
gulp.task('compila-js', function() {
	return gulp.src('./source/js/*.js')
	.pipe(gulp.dest('./dist/js/'));
});

//compila o projeto e mostra erros e para o processo
gulp.task('watch', function() {
	gulp.watch('./source/sass/**/*.scss',['sass']);
	gulp.watch('./source/js/**/*.js',['compila-js']);
});

//startando todas as tarefas so com o comando gulp
gulp.task('default',['buildjs','serve','sass','compila-js','watch']);