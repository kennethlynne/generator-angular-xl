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
    this.env.options.appPath = this.env.options.appPath || 'src';
  }

};

util.inherits(Generator, ScriptBase);

Generator.prototype.createComponentFiles = function createComponentFiles() {
    this.viewClassesForScss = '.' + this.dasherizedName + '-component';
    this.viewClassesForHTML = this.dasherizedName + '-component';
    var targetPath = this.slugifiedPath.join('/') + '/' + this.dasherizedName;

    this.generateSourceAndTest(
        'component',
        'spec/component',
        ('../components/' + _.dasherize(this.name)),
        '../unit/spec/components/' + targetPath
    );


    this.template('../common/component.scss', path.join(this.env.options.appPath, 'components', targetPath, '_' + this.dasherizedName + '.scss'));
    this.addStyleToComponentScss('../components/' + targetPath + '/' + this.dasherizedName);

    this.template('../common/component.html', path.join(this.env.options.appPath, 'components', targetPath, this.dasherizedName + '.html'));
};
