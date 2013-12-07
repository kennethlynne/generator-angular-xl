'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.hookFor('angular-awesome:controller');
  this.hookFor('angular-awesome:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteRoutesJs = function () {
  var config = {
    file: path.join(
      this.env.options.appPath,
      'scripts/config/routes.js'
    ),
    needle: '.otherwise',
        splicable: [
        "    templateUrl: viewDir + '" + this.name + ".html',",
        "    controller: '" + this.classedName + "Ctrl'",
        "    resolve: {",
        "        init: prepare('" + this.classedName + "CtrlInit')",
        "    }"
    ]
  };

  config.splicable.unshift(".when('/" + this.name + "', {");
  config.splicable.push("})");

  //angularUtils.rewriteFile(config);
};
