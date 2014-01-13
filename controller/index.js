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
        this.templateUrl = 'pages/' + path + '/index/views/main-view.html';
        //TODO: Support view inheritance using dot notation
        //https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views
    }
    else
    {
        this.templateUrl = 'pages/' + this.dasherizedName + '/index/views/main-view.html';
        this.statifiedPath = this.dasherizedName;
    }

    this.pageUrl = path;


    this.generateSourceAndTest(
        'controller',
        'spec/controller',
        ('../pages/' + path + '/index'),
        ('../unit/spec/pages/' + path + '/index'),
        this.dasherizedName + '-controller'
    );
};
