'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createModelFiles = function createModelFiles() {
    this.generateSourceAndTest(
        'model',
        'spec/model',
        'models/',
        '../unit/spec/models/'
    );

    this.generateSourceAndTest(
        'model-repository',
        'spec/model-repository',
        'repositories/',
        '../unit/spec/repositories/',
        this.dasherizedName + '-repository'
    );

    this.template('mock-api-model.js', path.join(this.env.options.appPath, 'dev', 'repositories', this.dasherizedName + '-mocks.js'));
};
