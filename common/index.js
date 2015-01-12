'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'src';
  }
  this.sourceRoot(path.join(__dirname, '../templates/common'));
  this.directory('root/app', './' + this.env.options.appPath, true);
  this.directory('root/test', './test' , true);
  this._processDirectory('root/config', './config');
  this.copy('root/.bowerrc', '.bowerrc');
  this.copy('root/.editorconfig', '.editorconfig');
  this.copy('root/.gitattributes', '.gitattributes');
  this.copy('root/.jshintrc', '.jshintrc');
  this.copy('root/karma.conf.js', 'karma.conf.js');
  this.copy('root/karma.debug.conf.js', 'karma.debug.conf.js');
  this.copy('root/protractor.conf.js', 'protractor.conf.js');
  this.copy('root/resources.json', 'resources.json');

  this.copy('gitignore', '.gitignore');
};

//TODO:  Find a non-hacky method for copying config directory without processing templates
Generator.prototype._processDirectory = function(source, destination) {
  var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
  var files = this.expandFiles('**', { dot: true, cwd: root });

  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    var src = path.join(root, f);

    var dest = path.join(destination, f);
    this.copy(src, dest);
  }
};
