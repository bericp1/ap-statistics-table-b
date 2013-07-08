module.exports = function (grunt) {
  'use strict';
  var path = require('path');
  var appConf = require('../app.conf.js');
  var port = appConf.serverPort;
  var serverPath = path.join(appConf.serverApp, 'server.js');
  grunt.registerTask(
    'start-server',
    'Starts the actual accompanying server for REAL testing and interaction.',
    function(){
      var server = require(serverPath);
      server.init({
        port: port,
        environment: 'development'
      });
      server.start();
    }
  );
};