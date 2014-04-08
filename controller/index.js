'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var _ = require('underscore.string');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
    var path = this.slugifiedPath.join('/') + '/' + this.dasherizedName;

    if (this.slugifiedPath.length > 0) {
        this.statifiedPath = this.slugifiedPath.join('-') + '-' + this.dasherizedName;
        this.stateName = this.slugifiedPath.join('_') + '_' + this.dasherizedName;
        this.viewTemplateUrl = 'states/' + path + '/index/main-view.html';
        this.stateUrl = '/' + this.slugifiedPath.join('/') + '/' + this.dasherizedName;
        path = this.slugifiedPath.join('/') + '/' + this.dasherizedName;
    }
    else
    {
        this.viewTemplateUrl = 'states/' + this.dasherizedName + '/index/main-view.html';
        this.statifiedPath = this.stateName = this.dasherizedName;
        this.stateUrl = '/' + this.dasherizedName;
        path = this.dasherizedName;
    }

    this.initService = false;

    this.generateSourceAndTest(
        'controller',
        'spec/controller',
        ('../states/' + path + '/index'),
        ('../unit/spec/states/' + path + '/index'),
        this.dasherizedName + '-controller'
    );
};
