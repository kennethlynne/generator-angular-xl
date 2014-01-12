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
        path = path.replace(/(\.js|\.src.js)/, ".min.js");
        return yeomanConfig.app + '/' + path;
    });

    var appJs = includes.javascript.app.map(function (path) {
        return yeomanConfig.app + '/' + path;
    });

    var cssFiles = includes.css.map(function (path) {
        return '.tmp/' + path;
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                files: ['<%%= yeoman.app %>/styles/**/*.{scss,sass}', '<%%= yeoman.app %>/components/**/*.{scss,sass}', '<%%= yeoman.app %>/pages/**/*.{scss,sass}'],
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
                        '.tmp/styles/**/*.css'
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
                        'CNAME',
                        'package.json'
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
                    dest: '.tmp/app_js/'
                }]
            }
        },
        concat: {
            options: {
                // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';\n",
                process: function(src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
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
            options: {
                banner: [
                    '/**',
                    ' * <%%= pkg.description %>',
                    ' * @version v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>',
                    ' * @link <%%= pkg.homepage %>',
                    ' * @author <%%= pkg.author %>',
                    ' * @license MIT License, http://www.opensource.org/licenses/MIT',
                    ' */'
                ].join('\n')
            },
            dist: {
                files: {
                    '.tmp/scripts/app.js': appJs.map(function (path) {
                        return '.tmp/app_js/' + path;
                    })
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
                    '<%%= yeoman.app %>/index.html': ['<%%= yeoman.dist %>/styles/*.css']
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
                configFile: "protractor.conf.js",
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'dist',
                tag: 'v' + require('./bower.json').version,
                message: 'Auto-generated build from v' + require('./bower.json').version
            },
            src: ['**']
        },
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                versionFile: 'package.json'
            }
        },
        "ddescribe-iit": {
            files: [
                'test/**/*.js'
            ]
        },
        //The manifest file must be served with the MIME type text/cache-manifest.
        manifest: {
            generate: {
                options: {
                    basePath: '<%= yeoman.dist %>/',
                    cache: ['<%= yeoman.dist %>/scripts/scripts.js', '<%= yeoman.dist %>/styles/main.css'],
                    network: ['*', 'http://*', 'https://*'],
                    fallback: ['/ /offline.html'],
                    exclude: ['js/jquery.min.js'],
                    preferOnline: true,
                    verbose: true,
                    timestamp: true,
                    hash: true,
                    master: ['index.html']
                },
                src: [ //TODO: Rev images, fonts, icons etc. to bust cache
                    '**/*.html',
                    '<%= yeoman.dist %>/scripts/**/*.js',
                    '<%= yeoman.dist %>/styles/**/*.css',
                    '*.{ico,png,txt}',
                    'images/**/*',
                    'fonts/*'
                ],
                dest: 'manifest.appcache'
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
        'htmlmin',
        'manifest'
    ]);

    grunt.registerTask('release', [
        'ddescribe-iit',
        'changelog',
        'deploy',
        'bump'
    ]);

    grunt.registerTask('deploy', [
        'ddescribe-iit',
        'test',
        'build',
        'test-e2e',
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
