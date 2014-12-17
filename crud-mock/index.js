'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createMockFiles = function createMockFiles() {
    this.template('mock-crud-api.js', path.join(this.env.options.appPath, 'dev', this.dasherizedName + '-mock.js'));
    this.template('mock-crud-api.json', path.join(this.env.options.appPath, 'dev', this.dasherizedName + '-mock.json'));
};
