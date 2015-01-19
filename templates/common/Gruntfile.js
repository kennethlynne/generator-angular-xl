// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  //Load external task configs from config folder
  var configs = require('load-grunt-configs')(grunt);
  grunt.initConfig(configs);

  var yeomanConfig = {
    app: require('./bower.json').appPath || 'src',
    dist: require('./bower.json').distPath || 'dist'
  };


  //Aliases
  grunt.registerTask('Run-app', [
    'server'
  ]);

  grunt.registerTask('Run-app-dist', [
    'server:dist'
  ]);

  grunt.registerTask('Sass-continuos(ruby)', [
    'exec:sass_watch',
    'replace:cssSourceMap'
  ]);

  grunt.registerTask('Sass-once(ruby)', [
    'exec:sass_dev',
    'replace:cssSourceMap'
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
    'sails-linker:devJs'
  ]);

  grunt.registerTask('linkAssets-production', [
    'sails-linker:prodJs'
  ]);

  grunt.registerTask('test', [
    'Test-once'
  ]);

  //Tasks
  grunt.registerTask('build', function (target) {

    if (target === 'dev') {
      console.log('Building using development profile');
      grunt.task.run([
        'clean',
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
    else {
      console.log('Building using production profile');
      grunt.task.run([
        'ddescribe-iit',
        'test-e2e',
        'test',
        'clean',
        'concurrent:dist',
        'sass:dist',
        'ngAnnotate',
        'uglify',
        'concat:js',
        'concat:css',
        'copy:dist',
        'cssmin',
        'copy:indexHTMLTemplate',
        'copy:indexHTML',
        'linkAssets-production',
        'htmlmin',
        'manifest'
      ]);
    }
  });

  grunt.registerTask('deploy', function () {
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
      'copy:indexHTMLTemplate',
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'replace:cssSourceMap',
      'linkAssets-dev',
      'watch'
    ]);
  });

};
