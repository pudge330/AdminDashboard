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
					'css/main.css': 'css/src/main.scss'
				}
			}
			,prod: {
				options: {
					style: 'compressed'
					,"no-source-map": ''
				}
				,files: {
					'css/main.min.css': 'css/src/main.scss'
				}
			}
		}
		,autoprefixer: {
			options: {
				browsers: ['last 3 versions']
			}
			,dev: {
				'css/main.css': 'css/main.css'
			}
			,prod: {
				'css/main.min.css': 'css/main.min.css'
			}
		}
		,concat: {
			options: {
				separator: "\n",
			}
			,dist: {
				src: [
					'js/src/base.js'
					,'js/src/navigation.js'
					,'js/src/skeleton.js'
				],
				dest: 'js/skeleton.js',
			}
			,distRequireJS: {
				src: [
					'js/src/wrap-start.js'
					,'js/src/base.js'
					,'js/src/navigation.js'
					,'js/src/skeleton.js'
					,'js/src/wrap-end.js'
				],
				dest: 'js/skeleton-require.js',
			}
		}
		,uglify: {
			options: {
				mangle: true
			},
			dist: {
				files: {
					'js/skeleton.min.js': ['js/skeleton.js']
					,'js/skeleton-requirejs.min.js': ['js/skeleton-require.js']
				}
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
	]);
};