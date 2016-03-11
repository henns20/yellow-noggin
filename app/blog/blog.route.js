(function () {
  'use strict';

  angular
    .module('yn.blog')
    .config(stateConfig);


    function stateConfig($stateProvider) {
      $stateProvider
        .state('blog', {
          url: '/',
          views: {
            main_content: {
              templateUrl: 'app/blog/blog-main/blog-main-cards.html'
            }
          }
        })
        .state('blog-post', {
          url: '/:categoryId/post/:postId',
          views: {
            main_content: {
              templateUrl: 'app/blog/blog.post/blog.post.html'
            }
          }
        })
        .state('category', {
          url: '/category/:categoryId',
          views: {
            main_content: {
              templateUrl: 'app/blog/category/category-cards.html'
            }
          }
        });
    }
})();
