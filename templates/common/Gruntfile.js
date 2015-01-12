// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var includes = require('./resources.json');

  //Load external task configs from config folder
  var configs = require('load-grunt-configs')(grunt);
  grunt.initConfig(configs);

  var yeomanConfig = {
    app: require('./bower.json').appPath || 'src',
    dist: require('./bower.json').distPath || 'dist'
  };

  var externalJsSrc = includes.javascript.external.map(function (path) {
    return yeomanConfig.app + '/' + path;
  });

  var externalJsMin = includes.javascript.external.map(function (path) {
    path = path.replace(/(\.js|\.src.js)/, ".min.js");
    return yeomanConfig.app + '/' + path;
  });

  var appJs = includes.javascript.app.map(function (path) {
    return yeomanConfig.app + '/' + path;
  });

  var prototypeAppJs = appJs.slice(0); //copy appJs

  prototypeAppJs.splice(1, 0, (yeomanConfig.app + '/dev/**/*.js') ); //insert dev stuff (mocks etc) after module.js

  var cssFiles = includes.css.map(function (path) {
    return '.tmp/' + path;
  });

  //Aliases
  grunt.registerTask('Run-app', [
    'server'
  ]);

  grunt.registerTask('Run-app-dist', [
    'server:dist'
  ]);

  grunt.registerTask('Test-once', [
    'karma:unit'
  ]);

  grunt.registerTask('Test-continuous', [
    'karma:continuous'
  ]);

  grunt.registerTask('Test-continuous-debug', [
    'karma:debug'
  ]);

  grunt.registerTask('Test-continuous-coverage', [
    'karma:unit',
    'open:coverage',
    'karma:continuous'
  ]);


  grunt.registerTask('changelog', [
    'changelog',
    'bump'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);

  grunt.registerTask('linkAssets-dev', [
    'sails-linker:devStyles',
    'sails-linker:devJs'
  ]);

  grunt.registerTask('linkAssets-production', [
    'sails-linker:prodStyles',
    'sails-linker:prodJs'
  ]);

  grunt.registerTask('test', [
    'Test-once'
  ]);

  grunt.registerTask('test-e2e', [
    'protractor'
  ]);

  //Tasks
  grunt.registerTask('build', function (target) {

    if (target === 'dev') {
      console.log('Building using development profile');
      grunt.task.run([
        'clean',
        'copy:styles',
        'copy:tmpStyles2dist',
        'copy:app',
        'linkAssets-dev'
      ]);
    }
    else if (target === 'prototype') {
      console.log('Building using prototype profile');
      grunt.task.run([
        'clean',
        'concurrent:server',
        'copy',
        'linkAssets-dev'
      ]);
    }
    else
    {
      console.log('Building using production profile');
      grunt.task.run([
        'ddescribe-iit',
        'test-e2e',
        'test',
        'clean',
        'concurrent:dist',
        'ngAnnotate',
        'uglify',
        'concat:js',
        'concat:css',
        'copy:dist',
        'cssmin',
        'copy:indexHTML',
        'linkAssets-production',
        'htmlmin',
        'manifest'
      ]);
    }
  });

  grunt.registerTask('deploy', function(){
    grunt.task.run([
      'gitinfo',
      'replace:baseHref',
      'gh-pages'
    ]);
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'sass:dev',
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'linkAssets-dev',
      'watch'
    ]);
  });
};
