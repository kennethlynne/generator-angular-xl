'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var path = require('path');

var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);
    this.hookFor('angular-xl:model');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createRepositoryFiles = function createRepositoryFiles() {
    this.generateSourceAndTest(
        'repository',
        'spec/repository',
        'repositories/',
        '../unit/spec/repositories/',
        this.dasherizedName + '-repository'
    );
};
