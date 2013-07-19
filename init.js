#!/usr/bin/env node
/**
 * Initiates the project and offs itself.
 */

var prompt = require('prompt');
var replace = require('replace');

prompt.message = '';
prompt.delimeter = '';

prompt.start();

prompt.get({
  properties:{
    name:{
      description: 'What should the name of the app be? '
    }
  }
}, function(err, result){

  replace({
    regex: /app\-name\-here/gi,
    replacement: result.name,
    paths: ['.'],
    exclude: 'node_modules/*,client/app/vendor/*',
    recursive: true,
    silent: false,
    fileColor: 'white'
  });

  //Kill myself
  require('fs').unlink(require('path').join(__dirname, 'init.js'));

});