'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  ScriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
    var action = 'index';
    this.template('common/view.html', path.join(this.env.options.appPath, 'pages', this.dasherizedName, action, 'views', action + '.html'));
    this.template('common/page.scss', path.join(this.env.options.appPath, 'pages', this.dasherizedName, '_' + this.dasherizedName + '.scss'));
    this.addStyleToPagesScss('../pages/' + this.dasherizedName + '/' + this.dasherizedName);
};