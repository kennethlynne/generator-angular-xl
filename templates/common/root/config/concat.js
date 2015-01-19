module.exports = function() {
  var includes = require('../resources.json');
  var yeomanConfig = {
    app: require('../bower.json').appPath || 'src',
    dist: require('../bower.json').distPath || 'dist'
  };

  var externalJsMin = includes.javascript.external.map(function (path) {
    path = path.replace(/(\.js|\.src.js)/, ".min.js");
    return yeomanConfig.app + '/' + path;
  });

  var appJs = includes.javascript.app.map(function (path) {
    return yeomanConfig.app + '/' + path;
  });

  var prototypeAppJs = appJs.slice(0); //copy appJs

  prototypeAppJs.splice(1, 0, (yeomanConfig.app + '/dev/**/*.js')); //insert dev stuff (mocks etc) after module.js

  return {
    "options": {
      "banner": "'use strict';\n",
      "yeoman": "{<%= bugfix %>}"
    },
    "js": {
      "src": externalJsMin.concat(['.tmp/scripts/app.js']),
      "dest": "<%= yeoman.dist %>/scripts/scripts.js"
    },
    "css": {
      "src": ".tmp/styles/**/*.css",
      "dest": "<%= yeoman.dist %>/styles/main.css"
    }
  }
};
