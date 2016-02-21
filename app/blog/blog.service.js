(function () {
  'use strict';

  angular
    .module('yn.blog')
    .factory('BlogFactory', ['$http', '$q', BlogFactory]);




  function BlogFactory($http, $q) {
     return {
      getBlogs: getBlogs
    };



    function getBlogs() {
      return $http.get('./app/assets/mock-data/mock-blogs.json')
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          var message = 'query for blogs. ' +
          error.data.description;
          return $q.reject(message);
        });
    }
  }
})();
