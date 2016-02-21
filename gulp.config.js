  module.exports = function() {
    var config = {

      // all the js that i want to vet
      alljs: [
        './app/*.js',
        './app/**/*.js',
        './*.js']
      };

    return config;
  };
