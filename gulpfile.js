// Определяем переменную "preprocessor"
	let preprocessor = 'sass'; 
	 
	// Определяем константы Gulp
	const { src, dest, parallel, series, watch } = require('gulp');
	 
	// Подключаем gulp-concat
	const concat = require('gulp-concat');
	 
	// Подключаем gulp-uglify-es
	const uglify = require('gulp-uglify-es').default;
	 
	// Подключаем модули gulp-sass 
	const sass = require('gulp-sass');
	
	const rigger = require('gulp-rigger');
 
	// Подключаем Autoprefixer
	const autoprefixer = require('gulp-autoprefixer');
	 
	// Подключаем модуль gulp-clean-css
	const cleancss = require('gulp-clean-css');
	 
	// Подключаем gulp-imagemin для работы с изображениями
	const imagemin = require('gulp-imagemin');
	 
	// Подключаем модуль gulp-newer
	const newer = require('gulp-newer');
	 
	// Подключаем модуль del
	const del = require('del');
	 
	 
	function scripts() {
		return src([ // Берём файлы из источников
			'node_modules/jquery/dist/jquery.min.js', 
			'app/js/jquery.anoslide.js',
			'app/js/jquery.sticky-kit.min.js',
			'app/js/main.js', 			
			])
		.pipe(concat('app.min.js')) // Конкатенируем в один файл
		.pipe(uglify()) // Сжимаем JavaScript
		.pipe(dest('app/js/')) // Выгружаем готовый файл в папку назначения
	}
	 
	function styles() {
		return src('app/' + preprocessor + '/main.scss') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
		.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
		.pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
		.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
		.pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
	}
	
	function html() {
		return src('app/html/*.html') 
		.pipe(rigger())
		.pipe(dest('app/'))
	}
	 
	function images() {
		return src('app/images/src/**/*') // Берём все изображения из папки источника
		.pipe(newer('app/images/dest/')) // Проверяем, было ли изменено (сжато) изображение ранее
		.pipe(imagemin()) // Сжимаем и оптимизируем изображеня
		.pipe(dest('app/images/dest/')) // Выгружаем оптимизированные изображения в папку назначения
	}
	 
	function cleanimg() {
		return del('app/images/dest/**/*', { force: true }) // Удаляем всё содержимое папки "app/images/dest/"
	}
	 
	function buildcopy() {
		return src([ // Выбираем нужные файлы
			'app/css/**/*.min.css',
			'app/js/**/*.min.js',
			'app/fonts/**/*',
			'app/images/dest/**/*',
			'app/*.html',
			], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
		.pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
	}
	 
	function cleandist() {
		return del('dist/**/*', { force: true }) // Удаляем всё содержимое папки "dist/"
	}
	 
		 
	// Экспортируем функцию scripts() в таск scripts
	exports.scripts = scripts;
	 
	// Экспортируем функцию styles() в таск styles
	exports.styles = styles;
	 
	// Экспорт функции images() в таск images
	exports.images = images;
	 
	// Экспортируем функцию cleanimg() как таск cleanimg
	exports.cleanimg = cleanimg;
	 
	// Создаём новый таск "build", который последовательно выполняет нужные операции
	exports.build = series(html,cleandist, styles, scripts, images, buildcopy);
	 
	// Экспортируем дефолтный таск с нужным набором функций
	exports.default = parallel(html, styles, scripts, buildcopy);
