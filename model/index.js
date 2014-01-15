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
        'model-context',
        'spec/model-context',
        'contexts/',
        '../unit/spec/contexts/',
        this.dasherizedName + '-context'
    );

    this.template('mock-api-model.js', path.join(this.env.options.appPath, 'dev', 'models', this.dasherizedName + '-mocks.js'));
};
