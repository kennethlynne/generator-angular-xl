'use strict';
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
  });
  this.scriptAppName = this.appname;

  args = ['index'];

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.appPath = this.env.options.appPath;

  this.hookFor('angular-xl:common', {
    args: args
  });

  this.hookFor('angular-xl:main', {
    args: args
  });

  this.hookFor('angular-xl:repository', {
    args: 'awesome'
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

    var prompts = [
        {
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [
                {
                    value: 'ngStorageModule',
                    name: 'angular-storage.js',
                    checked: false
                },
                {
                    value: 'touchModule',
                    name: 'angular-touch.js',
                    checked: false
                },
                {
                    value: 'lodash',
                    name: 'lodash.js',
                    checked: false
                },
                {
                    value: 'restangularModule',
                    name: 'restangular.js',
                    checked: false
                },
                {
                    value: 'resourceModule',
                    name: 'angular-resource.js',
                    checked: false
                },
                {
                    value: 'cookiesModule',
                    name: 'angular-cookies.js',
                    checked: false
                },
                {
                    value: 'sanitizeModule',
                    name: 'angular-sanitize.js',
                    checked: false
                }
            ]
        }
    ];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.restangularModule = hasMod('restangularModule');
    this.touchModule = hasMod('touchModule');
    this.ngStorageModule = hasMod('ngStorageModule');
    this.lodash = hasMod('lodash');

    var angMods = ["'kennethlynne.componentFactory'", "'ngSymbiosis.utils'", "'ngSymbiosis.routeProvider'", "'ngSymbiosis.repository'", "'ngSymbiosis.model'", "'" + this.scriptAppName + ".components'", "'ngAnimate'", "'ajoslin.promise-tracker'", "'cgBusy'", "'chieffancypants.loadingBar'", "'ui.router'", "'ui.bootstrap'"];

      if (this.cookiesModule) {
          angMods.push("'ngCookies'");
      }
      if (this.resourceModule) {
          angMods.push("'ngResource'");
      }
      if (this.restangularModule) {
          angMods.push("'restangular'");
      }
      if (this.sanitizeModule) {
          angMods.push("'ngSanitize'");
      }
      if (this.touchModule) {
          angMods.push("'ngTouch'");
      }
      if (this.ngStorageModule) {
          angMods.push("'ngStorage'");
      }
      if (this.lodash) {
          this.template('../../templates/javascript/framework/lodash.js', 'app/scripts/utils/lodash.js');
          this.template('../../templates/javascript/spec/lodash.js', 'test/unit/spec/utils/lodash.js');
      }

    this.env.options.angularDeps = "\n  " + angMods.join(",\n  ") +"\n";

    cb();
  }.bind(this));
};

Generator.prototype.readIndex = function readIndex() {
  this.indexFile = this.engine(this.read('../../templates/common/index.html'), this);
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function () {
    this.template('../../templates/common/_bower.json', 'bower.json');
    this.template('../../templates/common/_package.json', 'package.json');
    this.template('../../templates/common/Gruntfile.js', 'Gruntfile.js');
    this.template('../../templates/javascript/framework/deepExtend.js', 'app/scripts/deepExtend.js');
    this.template('../../templates/javascript/framework/config.js', 'app/config/config.js');
    this.template('../../templates/javascript/framework/log-decorator.js', 'app/scripts/log.js');
    this.template('../../templates/javascript/framework/errorCtrl.js', 'app/states/error/index/error.js');
    this.template('../../templates/javascript/navbar.js', 'app/components/navbar/navbar.js');
    this.template('../../templates/javascript/spec/navbar.js', 'test/unit/spec/components/navbar.js');
    this.template('../../templates/javascript/spec/errorCtrl.js', 'test/unit/spec/states/error/index/error.js');
    this.template('../../templates/javascript/framework/mainCtrl.js', 'app/states/index/index/index.js');
    this.template('../../templates/javascript/spec/mainCtrl.js', 'test/unit/spec/states/index/index/index.js');
    this.template('../../templates/javascript/framework/mock-api.js', 'app/dev/mock-api.js');
};
