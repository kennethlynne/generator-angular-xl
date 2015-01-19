module.exports = function(){
  var host = 'localhost'; //Useful for debugging devices via host machines ip
  var port = 9000;
  var yeomanConfig = {
    app: require('../bower.json').appPath || 'src',
    dist: require('../bower.json').distPath || 'dist'
  };

  return {
    options: {
      port: process.env.PORT || port,
      hostname: process.env.IP || host,
      livereload: 35729
    },
    livereload: {
      options: {
        open: true,
        middleware: function(connect) {
          return [
            connect.static('.tmp'),
            connect().use('/bower_components', connect.static('./bower_components')),
            connect.static(yeomanConfig.app)
          ];
        }
      }
    },
    dist: {
      options: {
        middleware: function(connect) {
          return [
            connect.static(yeomanConfig.dist)
          ];
        }
      }
    }

  };
};
