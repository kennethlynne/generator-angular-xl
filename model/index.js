'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');

var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);
    this.hookFor('angular-xl:crud-mock');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createRepositoryFiles = function createRepositoryFiles() {
    this.generateSourceAndTest(
        'model',
        'spec/model',
        'models/',
        '../unit/spec/models/'
    );
};
