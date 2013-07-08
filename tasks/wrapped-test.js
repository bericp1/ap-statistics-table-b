module.exports = function (grunt) {
  'use strict';

  var spawn = require('child_process').spawn;
  var util = require('util');
  var path = require('path');
  var appConf = require('./../app.conf.js');

  //Custom logging function
  var log = function(){
    var args = Array.prototype.slice.call(arguments);
    for(var i = 0; i < args.length; i++){
      if(args[i] instanceof Buffer){
        args[i] = args[i].toString();
      }
    }
    var str = util.format.apply(this, args);
    console.log( '[grunt.wrapped-test] ' + str );
  };

  var server = require(path.join(appConf.serverApp, 'server.js'));
  var port = appConf.serverTestPort || process.env.PORT || -1;
  server.init({
    port: port,
    environment: 'development'
  });

  grunt.registerTask(
    'wrapped-test',
    'Runs test wrapped in the server starter/stopper so that ' +
      'the tests have access to the actual dev server for real testing',
    function(component){
      var done = this.async();

      if(port === -1){
        grunt.log.error('A PORT env or app.conf.js variable must be set to run server tests');
        done(false);
        return;
      }

      if(typeof component !== 'string'){
        grunt.log.error('Must be run as wrapped-test:component.');
        done(false);
        return;
      }
      if(component !== 'server' && component !== 'client'){
        grunt.log.error('Component must be either `client` or `server`');
        done(false);
        return;
      }

      var runTests = function(){
        done(true);
        return true;
      };

      var conditionalExit = function (exitCode) {
        server.stop();
        var ret = true;
        if (exitCode !== 0) {
          ret = false;
        }
        done(ret);
      };

      if(component === 'client'){

        var karmaServer = require('karma').server;

        runTests = function(){
          karmaServer.start({
            configFile: path.join(appConf.clientTest, 'karma.conf.js')
          }, conditionalExit);
        };

      }else if(component === 'server'){

        var jasmineArgs = appConf.serverTestArgs.concat([
          'mock/',
          'spec/'
        ]);

        runTests = function() {
          var jasmineNode = spawn(
            appConf.serverTestExec,
            jasmineArgs,
            {
              'cwd': appConf.serverTest,
              'env': process.env
            }
          );
          jasmineNode.stdout.on('data', log);
          jasmineNode.stderr.on('data', log);
          jasmineNode.on('exit', conditionalExit);
          jasmineNode.on('error', function(err){
            log(err);
            conditionalExit(-1);
          });
        };

      }

      server.start(runTests);
    }
  );
};