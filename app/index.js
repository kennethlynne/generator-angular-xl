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
  this.scriptAppName = this.appname + angularUtils.appName(this);

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.appPath = this.env.options.appPath;

  this.hookFor('angular-sockless:common', {
    args: args
  });

  this.hookFor('angular-sockless:main', {
    args: args
  });

  this.hookFor('angular-sockless:controller', {
    args: args
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    choices: [{
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: false
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: false
    }, {
        value: 'sanitizeModule',
        name: 'angular-sanitize.js',
        checked: false
    }, {
        value: 'uirouterModule',
        name: 'angular-ui-router.js',
        checked: true
    }, {
        value: 'routeModule',
        name: 'angular-route.js',
        checked: false
    }, {
        value: 'restangularModule',
        name: 'restangular.js',
        checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.restangularModule = hasMod('restangularModule');
    this.uirouterModule = hasMod('uirouterModule');
    this.routeModule = hasMod('routeModule');

    var angMods = ["'componentFactory'", "'" + this.scriptAppName + ".components'", "'ngAnimate'", "'xeditable'", "'ajoslin.promise-tracker'", "'cgBusy'", "'chieffancypants.loadingBar'"];

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
      if (this.uirouterModule) {
          angMods.push("'ui.router'");
      }
      if (this.routeModule) {
          angMods.push("'ngRoute'");
      }

    this.env.options.angularDeps = "\n  " + angMods.join(",\n  ") +"\n";

    cb();
  }.bind(this));
};

Generator.prototype.readIndex = function readIndex() {
  this.indexFile = this.engine(this.read('../../templates/common/index.html'), this);
};

Generator.prototype.extraModules = function extraModules() {
  var modules = [];
  if (this.resourceModule) {
    modules.push('bower_components/angular-resource/angular-resource.js');
  }

  if (this.cookiesModule) {
    modules.push('bower_components/angular-cookies/angular-cookies.js');
  }

  if (this.sanitizeModule) {
    modules.push('bower_components/angular-sanitize/angular-sanitize.js');
  }

  if (this.animateModule) {
    modules.push('bower_components/angular-animate/angular-animate.js');
  }

  if (this.restangularModule) {
    modules.push('bower_components/restangular/dist/restangular.js');
  }

  if (this.uirouterModule) {
    modules.push('bower_components/angular-ui-router/angular-ui-router.js');
  }

  if (modules.length) {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/modules.js',
        modules);
  }
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function () {
    this.template('../../templates/common/_bower.json', 'bower.json');
    this.template('../../templates/common/_package.json', 'package.json');
    this.template('../../templates/common/Gruntfile.js', 'Gruntfile.js');
    this.template('../../templates/javascript/api-base-url.js', 'app/scripts/api-base-url.js');
    this.template('../../templates/javascript/application-config.js', 'app/scripts/config/application-config.js');
    this.template('../../templates/javascript/mock-api.js', 'app/scripts/mock-api.js');
};
