module.exports = function(grunt){
  var yeomanConfig = {
    app: require('../bower.json').appPath || 'src',
    dist: require('../bower.json').distPath || 'dist'
  };

  return yeomanConfig;

};
