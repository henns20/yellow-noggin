 (function () {
  'use strict';

  angular
    .module('yn.blog')
    .controller('BlogController', ['BlogFactory', '$stateParams', '$q', '$rootScope', '$scope', BlogController]);

      function BlogController(BlogFactory, $stateParams, $q, $rootScope, $scope) {
        var vm = this;
        vm.title = 'Jamie\'s Blog'; // value tests binding working
        vm.postId = $stateParams.postId;
        vm.categoryId = $stateParams.categoryId;
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
        } else if (pId && catId) {
            vm.getCurrentPost(pId)
              .then(function (data) {
                vm.currentPost = data;
                vm.myhtml = vm.currentPost.content;
                watchChangeColor();
              });
        } else {
            vm.getCategoryPosts(catId)
              .then(function (data) {
                vm.blogData  = data;
              });

              // TODO: make sense out of this
              // this work for faked heterologous sections not on individual posts
              // setCategoryColors(catId);

              //added this later see above
              // not sure also why needed the watchChangeColorin the else if above
              watchChangeColor();

        }
      }


      function watchChangeColor() {
        console.log('watch color is being called');
        $scope.$watch('vm.categoryId', function (x, y) {
          console.log(x, 'this is x');
          console.log(y, 'this is y');
          setCategoryColors(x);
        });
      }

      //TODO: js docs, set as a service(core service uses this as well)
      // (2) test unit test
      function setCategoryColors(catId) {
          switch (catId) {
            case ('full-stack'):
              vm.backgroundColor = {'background-color': '#455A64'};
              vm.headerTextColor = {'color': '#fff'};
              break;
            case ('marketeering'):
              vm.backgroundColor = {'background-color': '#FBC02D'};
              vm.headerTextColor = {'color': '#282828'};
              break;
            default:
              vm.backgroundColor = {'background-color': '#2196F3'};
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
              if (catId === 'full-stack') {
              filterResponse =  response.filter(function (element) {
                if (element.category === 'full-stack') {
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
