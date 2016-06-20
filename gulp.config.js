module.exports = function() {
    var app = './vcard-app/';

    var config = {

      index: './index.html',
      // all the js that i want to vet
      alljs: [
        app + '*.js',
        app + '**/*.js',
        './*.js'
      ],
      build: './build/',
      htmltemplates: app + '**/*.html',
      js: [
        app + '*.module js',
        '!' + app + '*.spec.js',
        app + '**/*.module.js',
        app + '**/*.js',
        app + '**/*.js',
        '!' + app + '**/*.spec.js',
        '!' + app + '**/*.spec-*.js'
      ],
      css: [
        './css/*.css'
        // './css/*.css'

      ],
      templateCache: {
        file: 'templates.js',
        options: {
          module: 'vcard',
          standAlone: false,
          root: 'vcard-app/'
        }
      },
      tmp: './tmp/' //TODO: alphabetize this config object as a whole

  };
    return config;
};
