module.exports = function (grunt) {

	grunt.initConfig({

		meta: {
			banner: '// ' + grunt.file.read('LICENSE').split("\n")[0]
		},

		coffee: {
			compile: {
				files: {
					'lib/jquery.x18n.js': ['lib/x18n/lib/x18n.coffee', 'lib/jquery.x18n.coffee'],
					'spec/spec.js': 'spec/spec.coffee'
				}
			}
		},

		concat: {
			dist: {
				src: ['<banner>', 'lib/jquery.x18n.js'],
				dest: 'lib/jquery.x18n.js'
			}
		},

		mocha: {
			all: {
				src: 'spec/index.html',
				run: true
			}
		},

		watch: {
			files: ['lib/jquery.x18n.coffee', 'spec/spec.coffee'],
			tasks: 'coffee concat'
		}

	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('test', 'mocha');
	grunt.registerTask('release', 'coffee concat');
	grunt.registerTask('default', 'release');

};