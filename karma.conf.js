// Karma configuration
// Generated on Wed Feb 17 2016 00:38:01 GMT-0500 (EST)do

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.18/angular-ui-router.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.4.8/angular-sanitize.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.0.5/angular-material.js',
      // end of core js libraries

      // yn app files
      './app/app.module.js',
      './app/core/core.module.js',
      './app/blog/blog.module.js',
      './app/blog/blog.route.js',
      './app/blog/blog.controller.js',
      './app/blog/blog.route.js',
      './app/blog/blog.service.js',
      './app/core/core.controller.js',
      './app/core/core.service.js',


      //angular mock file
      './node_modules/angular-mocks/angular-mocks.js',

      // yn spec files
      './app/blog/blog.route.spec.js',
      './app/blog/blog.controller.spec.js',
      './app/blog/blog.service.spec.js',
      './app/core/core.controller.spec.js',
      // './app/app.module.spec.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
