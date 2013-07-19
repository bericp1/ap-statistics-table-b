#!/usr/bin/env node
/**
 * Initiates the project and offs itself.
 */

var prompt = require('prompt');
var replace = require('replace');
var fs = require('fs');

var errHandler = function(err){
  if(err) throw err;
};

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

  errHandler(err);

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
  fs.unlink(require('path').join(__dirname, 'init.js'), errHandler);

  //Add me to .gitignore
  fs.appendFile('.gitignore', '\ninit.js', errHandler);

});