/**
 * Some app config stuff for global use
 */

var path = require('path');

exports["client"]			    = path.join( __dirname, "client" );
exports["clientApp"]		  = path.join( exports["client"], "app" );
exports["clientTmp"]		  = path.join( exports["client"], ".tmp" );
exports["clientTest"]	    = path.join( exports["client"], "test" );
exports["clientBower"]	  = path.join( exports["client"], "bower.json" );
exports["server"]         = path.join( __dirname, "server" );
exports["serverApp"]      = path.join( exports["server"], "app" );
exports["serverTest"]     = path.join( exports["server"], "test" );
exports["serverTestPort"] = 2455;
exports["serverPort"]     = 8000;
exports["serverTestArgs"] = ['--forceexit', '--verbose', '--color', '--captureExceptions'];
exports["serverTestExec"] = path.join( __dirname, 'node_modules/jasmine-node/bin/jasmine-node' );
exports["dist"]				    = path.join( __dirname, "public" );