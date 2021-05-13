module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "Yorkshire Water", // defaults to the name in package.json, or will use project directory's name
                success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },
        notify: {
            custom: {
                options: {
                    title: "Success!",
                    message: "All tasks processed successfully."
                }      
            }
        },
		sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'assets/css/styles.css': 'assets/sass/styles.scss'
                }
            }
        },
		autoprefixer: {
			options: {
				browsers: ['last 4 version', 'Safari >= 5']
			},
            dist: {
				expand: true,
				cwd: 'assets/css/',
				src: ['*.css'],
				dest: 'assets/css/',
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'assets/css/styles.min.css' : ['assets/css/styles.css']
				}
			}
        },
        exec: {
            webpack: 'npx webpack'
        },
        concat: {
			js: {
				src: [ 'assets/js/*js' ],
				dest: 'assets/js/concat/scripts.js',
			},
		},
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'assets/js/prod/scripts.min.js': ['assets/js/dev/scripts.js']
                }
            }
        },
        jshint: {
            files: ['assets/js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                },
                esversion: 6
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'assets/js/prod/scripts.js': 'assets/js/merged/scripts.js'
                }
            }
        },
		watch: {
            css: {
				files: ['assets/sass/**/*.scss'],
				tasks: ['sass', 'newer:autoprefixer:dist', 'cssmin', 'notify:custom'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['assets/js/*.js'],
				tasks: ['jshint', 'exec:webpack', 'uglify', 'notify:custom'],
				options: {
					spawn: false,
				},
			}
		},
		browserSync: {
			dev: {
                bsFiles: {
                    src: ['assets/css/styles.css', 'assets/js/dev/*.js', 'assets/js/prod/*.js', '*.html']
                },
                options: {
                    watchTask: true,
                    server: '.',
                    ghostMode: {
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
			}
		},
		tinyimg: {
			dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: 'assets/images/'
                }]
			}
        },
        critical: {
            test: {
                options: {
                    base: './',
                    css: [
                        'assets/css/styles.css'
                    ],
                    width: 1920,
                    height: 995
                },
                src: 'index.html',
                dest: 'assets/css/critical.css'
            }
        }
    });

    grunt.registerTask('default', [
        'sass',
        'newer:autoprefixer:dist',
        'jshint',
        'exec:webpack',
        'cssmin',
        'uglify',
        'notify:custom'
    ]);
	grunt.registerTask('serve', [
        'browserSync',
        'watch'
    ]);
    grunt.registerTask('compress', [
        'tinyimg'
    ]);
    grunt.registerTask('criticalcss', [
        'critical'
    ]);
    grunt.registerTask('prod', [
        'sass',
        'newer:autoprefixer:dist',
        'jshint',
        'exec:webpack',
        'cssmin',
        'uglify',
        'tinyimg',
        'critical',
        'notify:custom'
    ]);
};
