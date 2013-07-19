//Dependencies
var express = require('express');
var util    = require('util');

//Express App
var server = express();

//Custom logging function
var log = function () {
  'use strict';
  var pre = server.get('log prefix') || '';
  console.log(pre + '[server] ' + util.format.apply(this, arguments));
};

/**
 * Configures the server
 * @param {{port, environment, logPrefix}} config
 */
var init = function (config) {
  'use strict';

  if(server.get('initiated') && config == server.get('initial config')){
    return this;
  }

  if(typeof config !== 'object'){
    config = {};
  }else{
    if(typeof config.logPrefix === 'string'){
      server.set('log prefix', config.logPrefix);
    }
  }

  console.log('');
  log('Initiating server...');

  //Some server config values
  server.set('env', config.environment || process.env.NODE_ENV || 'development');
  server.set('port', config.port || process.env.PORT || -1);

  if(server.get('port') === -1){
    throw new Error('Port must be provided through config object (config.port) or environment variable ($PORT).');
  }

  //Filter Middleware
  server.use(express.bodyParser());
  server.use(express.methodOverride());

  //Development Only Middleware
  if ('development' === server.get('env')) {
    //Minimal Logger
    server.use(function(req, res, next){
      log('%s %s', req.method, req.url);
      next();
    });
    //Comment out the following line if you have the livereload browser extension installed
    server.use( require('connect-livereload')() );
    server.use( express.static( 'client/app' ) );
    server.use( express.static( 'client/.tmp' ) );
  }
  //Production-Only Middleware
  if ('production' === server.get('env')) {
    server.use( express.static( 'public' ) );
  }

  // Server logic/routes go here

  server.set('initiated', true);
  server.set('initial config', config);
  return this;
};

/**
 * Starts server if not running. If it hasn't been initiated yet, it does so with default settings
 * @param {!function} readyCallback
 */
var start = function (readyCallback) {
  'use strict';
  if (!this.serverInstance) {
    if(!server.get('initiated')){
      init();
    }
    log('Starting server...');
    this.serverInstance = server.listen(server.get('port'), function () {
      log('Server running on port %d in %s mode', server.get('port'), server.get('env'));
      if (readyCallback) {
        readyCallback();
      }
    });
  }
  return this;
};

/**
 * Stops server if running
 */
var stop = function (stopAndExit) {
  'use strict';
  if(this && this.serverInstance){
    log('Stopping server...');
    this.serverInstance.close();
    if(stopAndExit){
      process.exit(0);
    }
    delete this.serverInstance;
  }
  return this;
};

process.on('exit', function(){
  'use strict';
  stop(true);
});
process.on('stopServer', stop);

exports.init  = exports.configure = init;
exports.start = exports.open      = start;
exports.stop  = exports.close     = stop;