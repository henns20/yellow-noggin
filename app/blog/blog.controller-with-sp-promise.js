(function () {
  'use strict';

  angular
    .module('yn.blog')
    .controller('BlogController', ['BlogFactory', '$stateParams', '$q', '$rootScope', BlogController]);

      function BlogController(BlogFactory, $stateParams, $q, $rootScope) {
        var vm = this;
          // postId = 0;
        vm.title = 'Jamie\'s Blog';
        vm.blogData  = [];
        vm.currentPost = [];
        var postId = $stateParams.postId;
        // vm.currentPost = vm.blogData[postId];

        getBlogData();
        // getPostId();
        // getCurrentPost().then(function (response) {
        //   vm.currentPost = response[$stateParams.postId];
        // });
        getCurrentPost(postId);


        function getBlogData() {
          //called the blog service get blogs and save it to blog data 4 assignment 2 using a promise
          BlogFactory.getBlogs()
            .then(function (response) {
              vm.blogData = response;
            });
        }

        // function getCurrentPost() {
        //   // console.log($stateParams.postId, "get post Id");
        //   // console.log(vm.blogDatat);
        //   return BlogFactory.getBlogs()
        //     .then(function (response) {
        //       return $q.when(response);
        //     });
        //
        //   // console.log(r, "r");
        // }
        function getCurrentPost(pId) {
          console.log(pId);
          BlogFactory.getBlogs()
              .then(function (response) {
               vm.currentPost = response[pId];
          });
        }

      }

})();
