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

    var prototypeAppJs = appJs.slice(0); //copy appJs
    prototypeAppJs.splice(1, 0, (yeomanConfig.app + '/dev/**/*.js') ); //insert dev stuff (mocks etc) after module.js

    var cssFiles = includes.css.map(function (path) {
        return '.tmp/' + path;
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        gitinfo: {},
        watch: {
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
                    '{.tmp,<%%= yeoman.app %>}/**/*.js',
                    '<%%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            sailslinker: {
                files: ['<%%= yeoman.app %>/**/*.{js}'],
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
            coverage: 'test/coverage/*',
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
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/**/*.js',
                        '<%%= yeoman.dist %>/styles/**/*.css',
                        '<%%= yeoman.dist %>/assets/fonts/*'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/assets/images'
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
                    src: ['*.html', '!index.html', '../.tmp/index.html', 'views/**/*.html', 'pages/**/*.html', 'components/**/*.html'],
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
                        'assets/images/**/*.{gif,webp}',
                        'assets/fonts/**/*',
                        'CNAME',
                        'package.json'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/assets/images',
                    dest: '<%%= yeoman.dist %>/assets/images',
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
            },
            tmpStyles2dist: {
                expand: true,
                cwd: '.tmp/styles/',
                dest: '<%%= yeoman.dist %>/styles/',
                src: '**/*.css'
            },
            dev: {
                expand: true,
                cwd: '<%%= yeoman.app %>/dev',
                dest: '<%%= yeoman.dist %>/dev',
                src: '**/*.js'
            },
            indexHTML: {
                expand: true,
                cwd: '<%%= yeoman.app %>/',
                dest: '<%%= yeoman.dist %>/',
                src: ['./index.html']
            },
            app: {
                expand: true,
                cwd: '<%%= yeoman.app %>/',
                dest: '<%%= yeoman.dist %>/',
                src: ['**/*', '!**/*.{scss,sass,coffee}', '!dev/**/*']
            }
        },
        concurrent: {
            server: [
                'copy:styles',
                'copy:dev'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'htmlmin'
            ]
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'compressed',
                    loadPath: '<%%= yeoman.app %>/bower_components/',
                    noCache: true
                },
                files: {                         // Dictionary of files
                    '<%%= yeoman.app %>/styles/main.css': '<%%= yeoman.dist %>/styles/main.scss'       // 'destination': 'source'
                }
            }
        },
        exec: {
          sass_dev: {
              command: 'sass --load-path <%%= yeoman.app %>/bower_components/ --watch <%%= yeoman.app %>/styles/ '
          },
          sass_dist: {
              command: ''
          }
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
                    appRoot: '<%%= yeoman.app %>',
                    relative: true
                },
                files: {
                    '<%%= yeoman.app %>/index.html': externalJsSrc.concat(prototypeAppJs)
                }
            },

            prodJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '<%%= yeoman.dist %>',
                    relative: true
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/scripts/*.js']
                }
            },

            devStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '.tmp',
                    relative: true
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
                    appRoot: '<%%= yeoman.dist %>',
                    relative: true
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/styles/*.css']
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
                'test/**/*.js',
                '!test/coverage/**/*.js' // ignore this guy
            ]
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        //The manifest file must be served with the MIME type text/cache-manifest.
        manifest: {
            generate: {
                options: {
                    basePath: '<%%= yeoman.dist %>/',
                    cache: ['<%%= yeoman.dist %>/scripts/scripts.js', '<%%= yeoman.dist %>/styles/main.css'],
                    network: ['*', 'http://*', 'https://*'],
                    fallback: ['/ /offline.html'],
                    exclude: ['js/jquery.min.js'],
                    preferOnline: true,
                    verbose: true,
                    timestamp: true,
                    hash: false,
                    master: ['index.html']
                },
                src: [ //TODO: Rev images, fonts, icons etc. to bust cache
                    '**/*.html',
                    '<%%= yeoman.dist %>/scripts/**/*.js',
                    '<%%= yeoman.dist %>/styles/**/*.css',
                    '*.{ico,png,txt}',
                    'assets/images/**/*',
                    'assets/fonts/**/*'
                ],
                dest: '<%%= yeoman.dist %>/manifest.appcache'
            }
        },

        replace: {
            baseHref: {
                src: ['dist/index.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: 'base href="/"',
                    to: 'base href="<%%= gitinfo.remote.origin.url.substr(gitinfo.remote.origin.url.lastIndexOf("/")).replace(".git","/") %>"'
                }]
            }
        },

        coveralls: {
            options: {
                service_name: 'travis',
                repo_token: 'ZxL9uCI0txdnhqyyJVeQRFUWrpbINI6Gc',
                debug: false,
                dryRun: false,
                force: false,
                coverage_dir: 'test/coverage/'
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

    grunt.registerTask('build', function (target) {

        if (target === 'dev') {
            console.log('Building using development profile');
            grunt.task.run([
                'clean',
                'copy:styles',
                'copy:tmpStyles2dist',
                'copy:app',
                'linkAssets-dev'
            ]);
        }
        else if (target === 'prototype') {
            console.log('Building using prototype profile');
            grunt.task.run([
                'clean',
                'concurrent:server',
                'copy',
                'linkAssets-dev'
            ]);
        }
        else
        {
            console.log('Building using production profile');
            grunt.task.run([
                'ddescribe-iit',
                'test-e2e',
                'test',
                'clean',
                'concurrent:dist',
                'ngmin',
                'uglify',
                'concat:js',
                'concat:css',
                'copy:dist',
                'cssmin',
                'copy:indexHTML',
                'linkAssets-production',
                'htmlmin',
                'manifest'
            ]);
        }
    });

    grunt.registerTask('changelog', [
        'changelog',
        'bump'
    ]);

    grunt.registerTask('deploy', function(){
        grunt.task.run([
            'gitinfo',
            'replace:baseHref',
            'gh-pages'
        ]);
    });

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
