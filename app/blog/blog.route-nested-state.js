(function () {
  'use strict';

  angular
    .module('yn.blog')
    .config(stateConfig);


    function stateConfig($stateProvider) {
      $stateProvider
        .state('blog', {
          url: '/blog',
          views: {
            main_content: {
              templateUrl: 'app/blog/blog-main/blog-main.html'
            }
          }
        })
        .state('blog.post', {
          url: '/:postId',
          views: {
            main_content: {
              templateUrl: 'app/blog/blog.post/blog.post.html'
            }
          }
        });
    }
})();
https://github.com/angular-ui/ui-router/wiki/URL-Routing

<div ng-controller="BlogController as vm">
<h1>Main Blog Page</h1>
<div ng-repeat="blog in vm.blogData">
<h2 class="blog-title">
  <a ng-href="#/post/{{$index}}">{{blog.title}}</a>
 </h2>
<div class="blog-id">{{blog.id}}</div>
<div class="blog-excerpt">{{blog.excerpt}}</div>
<div class="read-more">
  <!-- <a ng-href="#/blog/{{$index}}">read more</a> -->
  <a ui-sref="blog.post({postId:$index})">read more</a>
</div>
</div>
</div>
