(function () {
  'use strict';

  angular
    .module('yn.blog')
    .controller('BlogController', ['BlogFactory', '$stateParams', '$q', '$rootScope', BlogController]);

      function BlogController(BlogFactory, $stateParams, $q, $rootScope) {
        var vm = this;
        vm.postId = $stateParams.postId;
        vm.categoryId = $stateParams.categoryId;
        vm.title = 'Jamie\'s Blog'; // value tests binding working
        vm.blogData  = [];
        vm.developmentPosts = [];
        vm.marketeeringPosts = [];
        vm.currentPost = {};
        vm.getMainBlogData = getMainBlogData;
        vm.getCurrentPost = getCurrentPost;
        vm.initialize = initialize;
        vm.getCategoryPosts = getCategoryPosts;
        // TODO: need to reverse order of blogs since they are in earliest date order because of gulp set up and really concatenates natural way of operating in the file system way of ordering files

        vm.initialize(vm.postId, vm.categoryId);


        /**
         * initialize - helps call proper blog function;allows for easier testing(see tests)
         * if - if no post id get all blogs
         * else - get current post data
         */
      function initialize(pId, catId) {
        if (!pId && !catId) {
          vm.getMainBlogData()
          .then(function (data) {
            vm.blogData = data;
          });
        } else if (pId && !catId) {
            vm.getCurrentPost(pId)
              .then(function (data) {
                vm.currentPost = data;
                vm.myhtml = vm.currentPost.content;
              });
        } else {
            vm.getCategoryPosts(catId)
              .then(function (data) {
                vm.blogData  = data;
              });
        }
      }



        /**
         * getBlogData -  get blog data for main blog page
         *
         * @return {array} of blog objects
         */
        function getMainBlogData() {
          //called the blog service get blogs and save it to blog data 4 assignment 2 using a promise
          return BlogFactory.getBlogs()
            .then(function (response) {
              return response;
            });
        }


        function getCategoryPosts(catId) {
          var filterResponse;
          return BlogFactory.getBlogs()
            .then(function (response) {
              if (catId === 'development') {
              filterResponse =  response.filter(function (element) {
                if (element.category === 'development') {
                    return element;
                }
              });
                // TODO:this here in case I want to use this for write up
                //      this was also in the lower if block
                // angular.forEach(response, function (element) {
                //   if (element.category === 'development') {
                //       vm.developmentPosts.push(element);
                //   }
                // });
              }
              if (catId === 'marketeering') {
                filterResponse = response.filter( function (element) {
                  if (element.category === 'marketeering') {
                    return element;
                  }
                });
              }
              return filterResponse;
          });

        }


        /**
         * getCurrentPost - description
         *
         * @param  {number} blog id number using stateParams service
         * @return {object} current blog page data
         */
        function getCurrentPost(pId) {
          // console.log(pId);
          return BlogFactory.getBlogs()
              .then(function (response) {
                return response[pId];
              });
        }

      }

})();
