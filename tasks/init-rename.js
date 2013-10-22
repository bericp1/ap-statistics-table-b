module.exports = function (grunt) {
  'use strict';
  var prompt = require('prompt');
	var replace = require('replace');
  var appConf = require('../app.conf.js');
  grunt.registerTask(
    'init-rename',
    'Renames the app from \'random-from-table-b\' to whatever the user inputs.',
    function(){
			prompt.message = '';
			prompt.delimeter = '';
			prompt.start();
			var done = this.async();
			prompt.get({
				properties:{
					name:{
						description: 'What should the name of the app be? '
					}
				}
			}, function(err, result){

				if(err){ throw err; }

				replace({
					regex: /app\-name\-here/gi,
					replacement: result.name,
					paths: [appConf.root],
					exclude: 'node_modules/*,client/app/vendor/*',
					recursive: true,
					silent: false,
					fileColor: 'white'
				});

				done();
			});
    }
  );
};
