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
              templateUrl: 'app/blog/blog-main/blog-main.html'
            }
          }
        })
        .state('blog-post', {
          url: '/post/:postId',
          views: {
            main_content: {
              templateUrl: 'app/blog/blog.post/blog.post.html'
            }
          }
        });
    }
})();
