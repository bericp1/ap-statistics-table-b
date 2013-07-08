'use strict';

var matchdep = require('matchdep');
var path = require('path');
var appConf = require('./app.conf.js');

/**
 * @param {{util, loadTasks, loadNpmTasks, initConfig, renameTask, registerTask, file:{readJSON}}} grunt
 */
module.exports = function (grunt) {
  // load all grunt tasks
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('tasks');

  var conf = {};
  //Temporary fix for https://github.com/shama/gaze/issues/41
  grunt.util._.each(appConf, function (val, key) {
    if (typeof val === 'string') {
      if (val.indexOf('/') === 0) {
        conf[key] = path.relative(__dirname, val);
        if (conf[key].slice(-1) === '/') {
          conf[key] = conf[key].substring(0, conf[key].length - 1);
        }
        return;
      }
    }
    conf[key] = val;
  });

  //noinspection SpellCheckingInspection
  grunt.initConfig({
    appConf: conf,

    //General tasks
    watch: {
      options: {
        livereload: true
      },
      compass: {
        files: '<%= appConf.clientApp %>/styles/{,*/}*.{scss,sass}',
        tasks: ['compass:dev']
      },
      templates: {
        files: '<%= appConf.clientApp %>/templates/**.html',
        tasks: ['ngtemplates:dev']
      },
      index: {
        files: '<%= appConf.clientApp %>/index.html'
      },
      js: {
        files: '<%= appConf.clientApp %>/scripts/{,*/}*.js'
      },
      css: {
        files: '{<%= appConf.clientTmp %>,<%= appConf.clientApp %>}/styles/{,*/}*.css'
      },
      images: {
        files: '<%= appConf.clientApp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
      },
      fonts: {
        files: '<%= appConf.clientApp %>/styles/fonts/{,*/}*.*'
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '<%= appConf.clientTmp %>',
              '<%= appConf.dist %>/*',
              '!<%= appConf.dist %>/.git*'
            ]
          }
        ]
      },
      temp: '<%= appConf.clientTmp %>',
      final: {
        files: [
          {
            dot: true,
            src: [
              '<%= appConf.server %>',
              '<%= appConf.client %>',
              '.bowerrc',
              '.editorconfig',
              '.jshintrc',
              'bower.json',
              'app.conf.js',
              'Gruntfile.js',
              'tasks',
              '.sass-cache',
              '*.log',
              'README.md',
              '<%= appConf.dist %>/js/templates.js'
            ]
          }
        ]
      },
      templates: [
        '<%= appConf.dist %>/scripts/templates.js',
        '<%= appConf.clientApp %>/scripts/templates.js',
        '<%= appConf.clientTmp %>/scripts/templates.js'
      ]
    },

    //Build-related Tasks
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/{,*/}*.js',
        '<%= appConf.clientApp %>/scripts/{,*/}*.js',
        '<%= appConf.serverApp %>/{,*/}*.js'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= appConf.clientApp %>/styles',
        imagesDir: '<%= appConf.clientApp %>/images',
        javascriptsDir: '<%= appConf.clientApp %>/scripts',
        fontsDir: '<%= appConf.clientApp %>/styles/fonts',
        importPath: '<%= appConf.clientApp %>/vendor',
        relativeAssets: true
      },
      dist: {
        options: {
          debugInfo: false,
          cssDir: '<%= appConf.clientApp %>/styles'
        }
      },
      dev: {
        options: {
          debugInfo: true,
          cssDir: '<%= appConf.clientTmp %>/styles'
        }
      }
    },
    useminPrepare: {
      html: '<%= appConf.clientApp %>/index.html',
      options: {
        dest: '<%= appConf.dist %>'
      }
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= appConf.clientApp %>/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= appConf.dist %>/images'
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= appConf.clientApp %>',
            dest: '<%= appConf.dist %>',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'vendor/**/*',
              'images/{,*/}*.{gif,webp}',
              'styles/fonts/*'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= appConf.server %>',
            dest: __dirname,
            src: [
              '**/*',
              '!test/**'
            ]
          }
        ]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= appConf.clientApp %>/**.html']
      }
    },
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= appConf.dist %>/scripts',
            src: 'scripts.js',
            dest: '<%= appConf.dist %>/scripts'
          }
        ]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= appConf.dist %>/scripts/{,*/}*.js',
            '<%= appConf.dist %>/styles/{,*/}*.css',
            '<%= appConf.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= appConf.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    usemin: {
      html: ['<%= appConf.dist %>/{,*/}*.html'],
      css: ['<%= appConf.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= appConf.dist %>']
      }
    },
    htmlmin: {
      dist:{
        options: {
          //removeCommentsFromCDATA: true,
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          //removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true
          //removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= appConf.clientApp %>',
            src: ['index.html', 'templates/**.html'],
            dest: '<%= appConf.dist %>'
          }
        ]
      }
    },
    ngtemplates: {
      options: {
        module: {
          name: 'compiled-templates',
          define: true
        }
      },
      dist: {
        options: {
          base: '<%= appConf.dist %>'
        },
        src: '<%= appConf.dist %>/templates/**.html',
        dest: '<%= appConf.clientApp %>/scripts/templates.js'
      },
      dev: {
        options: {
          base: '<%= appConf.clientApp %>'
        },
        src: '<%= appConf.clientApp %>/templates/**.html',
        dest: '<%= appConf.clientTmp %>/scripts/templates.js'
      }
    }
  });

  grunt.registerTask('dev', [
    'clean:temp',
    'compass:dev',
    'ngtemplates:dev',
    'start-server',
    'watch'
  ]);

  grunt.registerTask('client-test', [
    'clean:temp',
    'compass:dev',
    'wrapped-test:client'
  ]);

  grunt.registerTask('server-test', [
    'wrapped-test:server'
  ]);

  grunt.registerTask('test', [
    'client-test',
    'server-test'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'compass:dist',
    'useminPrepare',
    'imagemin',
    'cdnify',
    'htmlmin',
    'ngtemplates:dist',
    'concat',
    'cssmin',
    'clean:templates',
    'copy',
    'ngmin',
    'uglify',
    'rev',
    'usemin',
    'clean:final'
  ]);

  grunt.registerTask('default', ['dev']);
};

/* Old config blocks for safe keeping just in case:
 uglify: {
 dist: {
 files: {
 '<%= appConf.dist %>/scripts/scripts.js': [
 '<%= appConf.dist %>/scripts/scripts.js'
 ]
 }
 }
 }
 cssmin: {
 dist: {
 files: {
 '<%= appConf.dist %>/styles/main.css': [
 '<%= appConf.clientTmp %>/styles/{,*//*}*.css',
 '<%= appConf.clientApp %>/styles/{,*//*}*.css'
 ]
 }
 }
 }
 concat: {
 dist: {
 files: {
 '<%= appConf.dist %>/scripts/scripts.js': [
 '<%= appConf.clientApp %>/scripts/{,*//*}*.js'
 ]
 }
 }
 }
 */