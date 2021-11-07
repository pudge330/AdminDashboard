var timer = require("grunt-timer");

module.exports = function(grunt) {
	timer.init(grunt, { deferLogs: true });
	//--configuration
	grunt.initConfig({
		sass: {
			dev: {
				options: {
					style: 'expanded'
					,"no-source-map": ''
				}
				,files: {
					'dist/css/main.css': 'src/scss/main.scss'
				}
			}
			,prod: {
				options: {
					style: 'compressed'
					,"no-source-map": ''
				}
				,files: {
					'dist/css/main.min.css': 'src/scss/main.scss'
				}
			}
		}
		,autoprefixer: {
			options: {
				browsers: ['last 4 versions', '> 1%', 'ie >= 9', 'ff >= 3']
			}
			,dev: {
				src: 'dist/css/main.css',
				dest: 'dist/css/main.css'
			}
			,prod: {
				src: 'dist/css/main.min.css',
				dest: 'dist/css/main.min.css'
			}
		}
		,concat: {
			options: {
				separator: "\n",
			}
			,dist: {
				src: [
					'src/js/base.js'
					,'src/js/navigation.js'
					,'src/js/skeleton.js'
				],
				dest: 'dist/js/skeleton.js',
			}
			,distRequireJS: {
				src: [
					'src/js/wrap-start.js'
					,'src/js/base.js'
					,'src/js/navigation.js'
					,'src/js/skeleton.js'
					,'src/js/wrap-end.js'
				],
				dest: 'dist/js/skeleton-requirejs.js',
			}
		}
		,uglify: {
			options: {
				mangle: true
			},
			dist: {
				files: {
					'dist/js/skeleton.min.js': ['dist/js/skeleton.js']
					,'dist/js/skeleton-requirejs.min.js': ['dist/js/skeleton-requirejs.js']
				}
			}
		}
		,copy: {
			bglib: {
				src: 'src/js/vendor/bglib.js',
				dest: 'dist/js/vendor/bglib.js'
			},
			bglibMin: {
				src: 'src/js/vendor/bglib.min.js',
				dest: 'dist/js/vendor/bglib.min.js'
			}
		}
	});
	//--load
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//--tasks
	grunt.registerTask('default', [
		'sass'
		,'autoprefixer'
		,'concat'
		,'uglify'
		,'copy'
	]);
	grunt.registerTask('build:css', [
		'sass'
		,'autoprefixer'
	]);
	grunt.registerTask('build:css:dev', [
		'sass:dev'
		,'autoprefixer:dev'
	]);
	grunt.registerTask('build:css:prod', [
		'sass:prod'
		,'autoprefixer:prod'
	]);
	grunt.registerTask('build:js', [
		'concat'
		,'uglify'
		,'copy'
	]);
};