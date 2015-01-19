module.exports = function () {

  var includes = require('../resources.json');
  var yeomanConfig = {
    app: require('../bower.json').appPath || 'src',
    dist: require('../bower.json').distPath || 'dist'
  };

  var externalJsSrc = includes.javascript.external.map(function (path) {
    return yeomanConfig.app + '/' + path;
  });

  var appJs = includes.javascript.app.map(function (path) {
    return yeomanConfig.app + '/' + path;
  });

  var prototypeAppJs = appJs.slice(0); //copy appJs

  prototypeAppJs.splice(1, 0, (yeomanConfig.app + '/dev/**/*.js')); //insert dev stuff (mocks etc) after module.js

  return {
    "devJs": {
      "options": {
        "startTag": "<!--INJECT SCRIPTS-->",
        "endTag": "<!--/INJECT SCRIPTS-->",
        "fileTmpl": "<script src=\"%s\"></script>",
        "appRoot": "<%= yeoman.app %>",
        "relative": true
      },
      files: {
        '<%= yeoman.app %>/index.html': externalJsSrc.concat(prototypeAppJs)
      }
    },
    "prodJs": {
      "options": {
        "startTag": "<!--INJECT SCRIPTS-->",
        "endTag": "<!--/INJECT SCRIPTS-->",
        "fileTmpl": "<script src=\"%s\"></script>",
        "appRoot": "<%= yeoman.dist %>",
        "relative": true
      },
      "files": {
        "<%= yeoman.dist %>/index.html": [
          "<%= yeoman.dist %>/scripts/*.js"
        ]
      }
    },
    "devStyles": {
      "options": {
        "startTag": "<!--INJECT STYLES-->",
        "endTag": "<!--/INJECT STYLES-->",
        "fileTmpl": "<link rel=\"stylesheet\" href=\"%s\">",
        "appRoot": ".tmp",
        "relative": true
      },
      "files": {
        "<%= yeoman.app %>/index.html": [
          ".tmp/styles/**/*.css"
        ]
      }
    },
    "prodStyles": {
      "options": {
        "startTag": "<!--INJECT STYLES-->",
        "endTag": "<!--/INJECT STYLES-->",
        "fileTmpl": "<link rel=\"stylesheet\" href=\"%s\">",
        "appRoot": "<%= yeoman.dist %>",
        "relative": true
      },
      "files": {
        "<%= yeoman.dist %>/index.html": [
          "<%= yeoman.dist %>/styles/*.css"
        ]
      }
    },
    "yeoman": "{<%= bugfix %>}"
  }
};
