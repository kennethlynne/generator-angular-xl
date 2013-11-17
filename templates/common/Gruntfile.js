// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },
        watch: {
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/**/*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%%= yeoman.app %>/styles/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            styles: {
                files: ['<%%= yeoman.app %>/styles/**/*.css'],
                tasks: ['copy:styles']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/**/*.html',
                    '.tmp/styles/**/*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/**/*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: process.env.PORT || 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: process.env.IP || 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%%= yeoman.dist %>'
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/**/*.js'
            ]
        },
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    src: '**/*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '**/*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/**/*.js',
                        '<%%= yeoman.dist %>/styles/**/*.css',
                        '<%%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%%= yeoman.app %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%%= yeoman.dist %>/**/*.html'],
            css: ['<%%= yeoman.dist %>/styles/**/*.css'],
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     '<%%= yeoman.dist %>/styles/main.css': [
            //       '.tmp/styles/{,*/}*.css',
            //       '<%%= yeoman.app %>/styles/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'bower_components/**/*',
                        'images/**/*.{gif,webp}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '**/*.css'
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server',
                'copy:styles'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'copy:styles',
                'imagemin',
                'htmlmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        cdnify: {
            dist: {
                html: ['<%%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/scripts/scripts.js': [
                        '<%%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
        express: {
            options: {
                port: process.env.PORT || 80,
                hostname: process.env.IP || '*'
            },
            prod: {
                options: {
                    bases: path.resolve(__dirname, '<%%= yeoman.dist %>')
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('production', [
        'build',
        'express:prod',
        'express-keepalive'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
