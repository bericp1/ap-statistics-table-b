var tmp = {
  path: require('path')
};
tmp.appConf = require(tmp.path.join(__dirname, '../../app.conf.js'));
tmp.clientPath = tmp.appConf.client;
tmp.clientAppPath = tmp.appConf.clientApp;
tmp.clientTestPath = tmp.appConf.clientTest;
tmp.clientTempPath = tmp.appConf.clientTmp;

// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = tmp.appConf.client;

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  tmp.path.join( tmp.clientAppPath,  'vendor/angular-1.1.5/angular.js' ),
  tmp.path.join( tmp.clientAppPath,  'vendor/angular-1.1.5/angular-mocks.js'),
  tmp.path.join( tmp.clientTempPath, 'scripts/templates.js' ),
  tmp.path.join( tmp.clientAppPath,  'scripts/*.js' ),
  tmp.path.join( tmp.clientAppPath,  'scripts/**/*.js' ),
  tmp.path.join( tmp.clientTestPath, 'mock/**/*.js' ),
  tmp.path.join( tmp.clientTestPath, 'spec/**/*.js' )
];

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['progress'];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;

//Proxies for running server
proxies = {
  '/': 'http://localhost:' + tmp.appConf.serverTestPort
};

//Because of proxies
urlRoot = '/__test/';
