module.exports = function() {
    var config = {

      index: './index.html',
      // all the js that i want to vet
      alljs: [
        './app/*.js',
        './app/**/*.js',
        './*.js'
      ],
      js: [
        './app/*.module js',
        '!./app/*.spec.js',
        './app/**/*.module.js',
        './app/**/*.js',
        './app/**/*.js',
        '!./app/**/*.spec.js'
      ],
      css: [
        './app/assets/css/*.css',
        './app/assets/css/**/*.css'
      ]

  };
    return config;
};
