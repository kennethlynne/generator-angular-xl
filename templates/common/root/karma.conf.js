// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {

    var jsFiles = require('./resources.json').javascript.map(function (path) {
        return (require('./bower.json').appPath || 'app') + '/' + path;
    });

    var files = [].concat(jsFiles).concat([
        'test/loadTemplates.js',
        'test/matchers/**/*.js',
        'test/utils/*.js',
        'test/utils/**/*.js',
        'app/scripts/*.js',
        'app/scripts/**/*.js',
        'test/mock/**/*.js',
        'test/spec/**/*.js',
        'app/views/**/*.html',
        'app/components/**/*.html',
        'app/pages/**/*.html'

    ]);

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        preprocessors: {
            'app/views/**/*.html': ['ng-html2js'],
            'app/components/**/*.html': ['ng-html2js'],
            'app/pages/**/*.html': ['ng-html2js'],
            'app/scripts/**/*.js': ['coverage'],
            'app/components/**/*.js': ['coverage'],
            'app/pages/**/*.js': ['coverage']
        },

        // list of files / patterns to load in the browser
        files: files,

        reporters: ['spec', 'progress', 'coverage'],

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'test/coverage/'
        },
        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'compiledTemplates',
            stripPrefix: 'app/'
        },


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
