//chamando os arquivos para uso no projeto
var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");

gulp.task('thor', function() {
	return gulp.src('./source/sass/**/*.scss')
	//comprimindo css
	.pipe(sass({outputStyle:'compressed'}))
	//identificando momento do erro e mostrando msg de alerta
	.on('error', notify.onError({ title: 'Erro ao compilar', message: '<%= error.message %>'}))
	.pipe(gulp.dest('./dist/css'))
}); 

//movendo arquivos js para pasta dist
gulp.task('aquaman', function() {
	return gulp.src('./source/js/*.js')
	.pipe(gulp.dest('./dist/js/'));
});

//compila o projeto e mostra erros e para o processo
gulp.task('demolidor', function() {
	gulp.watch('./source/sass/**/*.scss',['thor']);
	gulp.watch('./source/js/**/*.js',['aquaman']);
});

//startando todas as tarefas so com o comando gulp
gulp.task('default',['thor','aquaman','demolidor']);