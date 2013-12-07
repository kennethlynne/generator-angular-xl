// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var yeomanConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: require('./bower.json').distPath || 'dist'
    };

    //TODO: Extract into separate json
    var jsFiles = [
        'scripts/module.js',
        'scripts/config/routes.js',
        'scripts/**/*.js'
    ].map(function (path) {
            return yeomanConfig.app + '/' + path;
        });

    //TODO: Extract into separate json
    var cssFiles = [
        'styles/**/*.css'
    ].map(function (path) {
            return yeomanConfig.app + '/' + path;
        });

    grunt.initConfig({
        yeoman: yeomanConfig,
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
            },
            sailslinker: {
                files: [].concat(jsFiles).concat(cssFiles),
                tasks: ['linkAssets']
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
            dist: {
                files: {
                    '<%%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/**/*.css',
                        '<%%= yeoman.app %>/styles/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: false,
                    removeOptionalTags: true,
                    removeEmpyElements: false
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: ['*.html', 'views/**/*.html'],
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
                singleRun: false
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
                    src: jsFiles,
                    dest: '.tmp/scripts'
                }]
            }
        },
        concat: {
            js: {
                src: '.tmp/scripts',
                dest: '<%%= yeoman.dist %>/scripts/scripts.js'
            },
            css: {
                src: '.tmp/styles',
                dest: '<%%= yeoman.dist %>/styles/main.css'
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
        'sails-linker': {

            devJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '<%%= yeoman.app %>'
                },
                files: {
                    '.tmp/index.html': jsFiles
                }
            },

            prodJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '<%%= yeoman.app %>'
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/scripts/scripts.js']
                }
            },

            devStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '<%%= yeoman.app %>'
                },

                files: {
                    '.tmp/index.html': cssFiles
                }
            },

            prodStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '.tmp/public/'
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/styles/main.css']
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
            'linkAssets-dev',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'ngmin',
        'concat',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'linkAssets-production',
        'htmlmin'
    ]);

    grunt.registerTask('linkAssets-dev', [
        'sails-linker:devStyles',
        'sails-linker:devJs'
    ]);

    grunt.registerTask('linkAssets-production', [
        'sails-linker:prodStyles',
        'sails-linker:prodJs'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};
