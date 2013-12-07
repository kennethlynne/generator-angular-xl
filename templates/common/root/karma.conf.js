// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        preprocessors: {
            'app/views/**/*.html': ['ng-html2js'],
            'app/scripts/**/*.js': ['coverage']
        },

        // list of files / patterns to load in the browser
        //TODO: Extract into json, share with build
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/lodash/lodash.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-component-factory/angular-component-factory.js',
            'app/bower_components/angular-loading-bar/build/loading-bar.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-busy/dist/angular-busy.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-promise-tracker/promise-tracker.js',
            'app/bower_components/restangular/dist/restangular.js',
            'app/bower_components/angular-xeditable/dist/js/xeditable.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'test/loadTemplates.js',
            'app/scripts/module.js',
            'test/matchers/**/*.js',
            'app/scripts/*.js',
            'app/scripts/**/*.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js',
            'app/views/**/*.html'
        ],

        reporters: ['progress', 'coverage'],

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
