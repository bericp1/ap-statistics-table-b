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
    preview: true,
    regex: /app\-name\-here/gi,
    replacement: result.name,
    recursive: true,
    silent: false
  });

  //Kill myself
  //fs.unlink(require('path').join(__dirname, 'init.js'));

});