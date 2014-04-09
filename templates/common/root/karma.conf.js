// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {

  var preprocessors = {},
    mapAppPath = function (path) {
      return appPath + '/' + path;
    },
    appPath = (require('./bower.json').appPath || 'app'),
    js = require('./resources.json').javascript,
    jsFiles = js.external.concat(js.app).map(mapAppPath),
    files = jsFiles.concat([
      'test/unit/loadTemplates.js',
      'test/unit/matchers/**/*.js',
      'test/unit/utils/*.js',
      'test/unit/utils/**/*.js',
        appPath + '/scripts/*.js',
        appPath + '/scripts/**/*.js',
      'test/unit/mock/**/*.js',
      'test/unit/spec/**/*.js',
        appPath + '/views/**/*.html',
        appPath + '/components/**/*.html',
        appPath + '/states/**/*.html'
    ]);

  function addPreprocessor(pros) {
    return function (path) {
      preprocessors[path] = pros;
    };
  }

  [
    '/scripts/**/*.js',
    '/components/**/*.js',
    '/states/**/*.js'
  ].map(mapAppPath)
    .forEach(addPreprocessor(['jshint', 'coverage']));

  [
    '/views/**/*.html',
    '/components/**/*.html',
    '/states/**/*.html'
  ].map(mapAppPath)
    .forEach(addPreprocessor('ng-html2js')); //insert row

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    preprocessors: preprocessors,

    // list of files / patterns to load in the browser
    files: files,

    reporters: [/*'spec', */'progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    },

    // list of files / patterns to exclude
    exclude: [
        appPath + '/bower_components/log/log.js',
        appPath + '/scripts/log.js'
    ],

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
