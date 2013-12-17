'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates/javascript/'));

  if (typeof this.env.options.appPath === 'undefined') {
    try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

};

util.inherits(Generator, ScriptBase);

Generator.prototype.createComponentFiles = function createComponentFiles() {
    this.generateSourceAndTest(
        'component',
        'spec/component',
        ('../components/' + _.dasherize(this.name)),
        'components',
        this.options['skip-add'] || false
    );

    this.template('../common/component.scss', path.join(this.env.options.appPath, 'components', _.dasherize(this.name), 'styles', '_' + _.dasherize(this.name) + '.scss'));
    this.addStyleToComponentScss('../components/' + _.dasherize(this.name) + '/styles/' + _.dasherize(this.name));

    this.template('../common/component.html', path.join(this.env.options.appPath, 'components', _.dasherize(this.name), 'views', _.dasherize(this.name) + '.html'));
};
