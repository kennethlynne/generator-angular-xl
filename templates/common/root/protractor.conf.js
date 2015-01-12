// An example configuration file.
exports.config = {

  // Capabilities to be passed to the webdriver instance.
  //WARNING:  Mouse move and context menu tests only work in Chrome and Firefox
  multiCapabilities: [

    {
      browserName: 'chrome',
      'chromeOptions': {
        args: [
          '--test-type',
          '--no-default-browser-check',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--start-maximized'
        ]
      }
    }/*,

     {
     'browserName': 'phantomjs',
     'phantomjs.binary.path':'./node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/PHANTOMJS'
     },


     {
     browserName: 'chrome',
     'chromeOptions': {
     args: [
     '--test-type',
     '--no-default-browser-check',
     '--no-first-run',
     '--disable-default-apps',
     '--disable-popup-blocking',
     '--start-maximized'
     ]
     }
     },
     {
     'browserName': 'safari'
     },
     {
     'browserName': 'firefox'
     }*/
  ],

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/spec/**/*.js'],

  baseUrl: 'http://0.0.0.0:9000/',

  seleniumServerJar: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.44.0.jar',
  chromeDriver: 'node_modules/grunt-protractor-runner/node_modules/protractor/selenium/chromedriver',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  onPrepare: function(){
    //Initialize some global variables
    //global.adminOpenButton = $('a.glyphicon-edit');
  }
};
