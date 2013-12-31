// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var includes = require('./resources.json');

    var yeomanConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: require('./bower.json').distPath || 'dist'
    };

    var externalJsSrc = includes.javascript.external.map(function (path) {
        return yeomanConfig.app + '/' + path;
    });

    var externalJsMin = includes.javascript.external.map(function (path) {
        path = path.replace(".js", ".min.js");
        return yeomanConfig.app + '/' + path;
    });

    var appJs = includes.javascript.app.map(function (path) {
        return yeomanConfig.app + '/' + path;
    });

    var cssFiles = includes.css.map(function (path) {
        return '.tmp/' + path;
    });

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/**/*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/**/*.coffee'],
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
                files: ['<%%= yeoman.app %>/**/*.{scss,sass,js}'],
                tasks: ['linkAssets-dev']
            }
        },
        connect: {
            options: {
                port: process.env.PORT || 9000,
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
                        '<%%= yeoman.dist %>/**/*',
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
                    removeEmptyElements: false
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: ['*.html', 'views/**/*.html', 'pages/**/*.html', 'components/**/*.html'],
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
                        'images/**/*.{gif,webp}',
                        'fonts/*',
                        'CNAME'
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
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    src: appJs,
                    dest: '.tmp/app_scripts'
                }]
            }
        },
        concat: {
            js: {
                src: externalJsMin.concat(['.tmp/scripts/app.js']),
                dest: '<%%= yeoman.dist %>/scripts/scripts.js'
            },
            css: {
                src: '.tmp/styles/**/*.css',
                dest: '<%%= yeoman.dist %>/styles/main.css'
            }
        },
        uglify: {
            dist: {
                files: {
                    '.tmp/scripts/app.js': [
                        '.tmp/app_scripts/**/*.js'
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
                    '<%%= yeoman.app %>/index.html': externalJsSrc.concat(appJs)
                }
            },

            prodJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '<%%= yeoman.dist %>/'
                },
                files: {
                    '<%%= yeoman.app %>/index.html': ['<%%= yeoman.dist %>/scripts/*.js']
                }
            },

            devStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '.tmp'
                },

                files: {
                    '<%%= yeoman.app %>/index.html': cssFiles
                }
            },

            prodStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '<%%= yeoman.dist %>/'
                },
                files: {
                    '<%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/styles/*.css']
                }
            }

        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            }/*,
            dist: {
                options: {
                    configFile: "e2e.conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }*/
        },
        'gh-pages': {
            options: {
                base: 'dist',
                tag: 'v' + require('./bower.json').version,
                message: 'Auto-generated build from v' + require('./bower.json').version
            },
            src: ['**']
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

    grunt.registerTask('test-e2e', [
        'protractor'
    ]);

    grunt.registerTask('build', [
        'clean',
        'concurrent:dist',
        'ngmin',
        'uglify',
        'concat',
        'copy:dist',
        'cssmin',
        'rev',
        'linkAssets-production',
        'htmlmin'
    ]);

    grunt.registerTask('release', [
        'test',
        'build',
        'test-e2e',
        'bump',
        'gh-pages'
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
