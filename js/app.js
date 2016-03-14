(function () {
  'use strict';

  angular
    .module('yn', [
      'yn.core',
      'yn.blog'
    ]);

  })();

(function () {
  'use strict';

  angular
    .module('yn.blog', ['yn.core']);
})();

(function () {
  'use strict';

  angular
    .module('yn.core', [
      'ngAnimate',
      'ngAria',
      'ui.router',
      'ngMessages',
      'ngSanitize',
      'ngMaterial'
    ]);
})();

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
      return $http.get('./blog/all-blogs.json')
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          var message = 'query for blogs. ' +
          error.data.description;
          return $q.reject(message);
        });
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('yn.core')
    .controller('CoreController',[
      'coreService',
      '$state',
      '$q',
      '$scope',
      '$rootScope',
      '$stateParams',
      CoreController
    ]);

  function CoreController(coreService, $state, $q, $scope, $rootScope, $stateParams) {
    var vm = this;
    vm.controllerName = 'Controller';
    vm.state = $state;
    vm.isHomeState =  checkIfHomeState();
    // vm.isHomeState = undefined; TODO: see if this reveal convention is proper
    vm.headerHeight = getHeaderHeight();
    vm.backgroundColor = watchChangeColor();



    //TODO: general cleanup;review of pattern;js docs;controller test unit
    function watchChangeColor() {
      $scope.$watch('vm.state.params.categoryId', function (x, y) {
        setCategoryColors(x);
      });
    }


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
            vm.headerTextColor = {'color': '#FFFF8d'};
        }
    }


    function checkIfHomeState() {
      $scope.$watch('vm.state.current.name', function (x, y) {

            if (x === 'blog') {
              vm.isHomeState = true;
            } else {
              vm.isHomeState = false;
            }
      });
    }

    function getHeaderHeight() {
      $scope.$watch('vm.isHomeState', function (x, y) {
        // console.log(x);
          if (vm.isHomeState === true) {
            vm.headerHeight = {
              'height': '256px'
            };
          } else {
            vm.headerHeight = {
              'height': '64px'
            };
          }
      });
    }

  }
})();

(function () {
  'use strict';

  angular
    .module('yn.core')
    .config(themeSite);

    function themeSite($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '500',
        'hue-1': '700',
        'hue-2': '300'
      })
      .accentPalette('yellow', {
        'default': 'A200'
      });
    }
})();

(function () {
  'use strict';

  angular
    .module('yn.core')
    .config(stateConfig);

    function stateConfig($urlRouterProvider) {
       // Defines a path that is used when an
       // invalid route is requested.
        $urlRouterProvider.otherwise('/');
    }

  })();

(function () {
  'use strict';

  angular
    .module('yn.core')
    .factory('coreService', ['$state', coreService])
    .filter('capitalize', capitalize);

  function coreService($state) {
    return {
          isHomeState: isHomeState($state)
    };



      function isHomeState(state) {
        // console.log(state.current, 'his home state');
        // console.log(state, 'his home state');
        // if ($state.current.name === 'blog') {
        //   return true;
        // } else {
        //   return false;
        // }
        return false;
    }
  }

  function capitalize() {
    return function (input, format, separator) {
     if (!input) {
       return input;
     }
     format = format || 'all';
     separator = separator || ' ';
     if (format === 'first') {
       // Capitalize the first letter of a sentence
       var output = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
       if (separator === ' ') {
         return output;
       } else {
         return output.split(separator).join(' ');
       }
     } else {
       return input.split(separator).map(function(word) {
         if (word.length === 2 && format === 'team') {
           // Uppercase team abbreviations like FC, CD, SD
           return word.toUpperCase();
         } else {
           return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
         }
       }).join(' ');
     }
    };
  }


})();

angular.module("yn.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/blog/blog-main/blog-main-cards.html","<div ng-controller=\"BlogController as vm\"><div class=\"fake-header js-in-page-fake-header\"><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\"><span class=\"original return\">Yellow Noggin</span></h1></div></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=site-width><div layout=row layout-wrap><div class=\"blog-teaser-block article\" flex=50 ng-repeat=\"blog in vm.blogData\"><a ng-href=#/{{blog.category}}/post/{{$index}} class=blog-block><div id=blog-cards-container class=card-outline><div class=\"text colorstyle light\"><div class=blog-cards-heading><h3 class=blog-title><span>{{blog.title}}</span></h3><div class=blog-description>{{blog.description}}</div></div></div><div class=blog-cards-image><img ng-src={{blog.image}} alt></div><div class=blog-cards-body><div class=blog-cards-bottom layout=row><div flex=25><div class=blog-cards-bottom-category>{{blog.category}}</div></div><div flex=50></div><div flex=25><div class=chevron-right><i class=\"fa fa-chevron-right\"></i></div></div></div></div></div></a></div></div></div></div></div></div>");
$templateCache.put("app/blog/blog-main/blog-main-cover.html","<div ng-controller=\"BlogController as vm\"><div class=\"fake-header js-in-page-fake-header\"><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\"><span class=\"original return\">Yellow Noggin</span></h1></div></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=site-width><div layout=row layout-wrap><div class=\"blog-teaser-block article\" flex=50 ng-repeat=\"blog in vm.blogData\"><a ng-href=#/{{blog.category}}/post/{{$index}} class=blog-block><div id=blog-teaser-container><div class=\"text colorstyle light\"><div class=blog-teaser-heading><h3 class=blog-title><span>{{blog.title}}</span></h3><div class=blog-description>{{blog.description}}</div></div></div><div class=blog-teaser-image><img ng-src={{blog.image}} alt></div><div class=blog-teaser-body><div class=read-more><a ng-href=#/post/{{$index}}>read more</a></div></div></div></a></div></div></div></div></div></div>");
$templateCache.put("app/blog/blog-main/blog-main-old.html","<div class=\"wrapper js-page-wrapper\"><div ng-controller=\"BlogController as vm\"><div id=top class=\"main js-page-container\"><div class=page><div class=\"fake-header js-in-page-fake-header\"><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\"><span class=original>Yellow Noggin</span></h1></div></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=site-width><div layout=row layout-wrap><div class flex=50 ng-repeat=\"blog in vm.blogData\"><h2 class=blog-title><a ng-href=#/post/{{$index}}>{{blog.title}}</a></h2><div class=blog-id>{{blog.id}}</div><div class=blog-excerpt>{{blog.excerpt}}</div><div class=read-more><a ng-href=#/post/{{$index}}>read more</a></div></div></div></div></div><footer class=site-footer></footer></div></div></div></div></div>");
$templateCache.put("app/blog/blog-main/blog-teaser.html","");
$templateCache.put("app/blog/blog-main/gd-teaser-all.html","<li class=\"g-column g-1-2 m-1-1\"><span id=type-grid-article-first-edition class=-off-screen>Article</span> <a data-wave=true aria-labelledby=\"type-grid-article-first-edition label-grid-article-first-edition\" aria-describedby=description-grid-article-first-edition href=\"/articles/first-edition/\" class=\"grid-block article -full-bleed -aspect-1x1 -hoverable js-grid-item\"><div class=\"_bg fill-space\" style=\"background-color: #cfced3\" aria-hidden=true></div><div class=\"_image js-responsive-image js-wave-layer\" data-src=//g-design.storage.googleapis.com/production/v5/assets/span-reader-header.jpg data-alternate-src=//g-design.storage.googleapis.com/production/v5/assets/span-reader-tile-1x1.jpg aria-hidden=true></div><div class=\"_lazy-placeholder -dark\"></div><div class=\"_text -dark\"><div class=_heading><h3 class=_title><span class=\"hidden-chars js-hide-eol-dot\"><span id=label-grid-article-first-edition class=_original>First Edition</span> <span class=\"_dotted js-dotted\" aria-hidden=true>First<span class=\"_dot js-dot\"></span>Edition<span class=_return></span></span></span></h3><p id=description-grid-article-first-edition class=_description>A behind-the-scenes look at our SPAN 2015 reader.</p></div></div><p aria-hidden=true class=\"source -dark\">Article / Case Study</p><div class=\"tile-icon -dark\"><svg focusable=false class=\"svg-icon tile-chevron-right\" xmlns=http://www.w3.org/2000/svg viewbox=\"0 0 24 24\"><path class=_fill-color opacity=1 fill=#000000 d=\"M9 4L7.6 5.4l6.6 6.6-6.6 6.6L9 20l8-8\"></path></svg></div></a></li>");
$templateCache.put("app/blog/blog-main/gd-teaser.html","<li class=\"g-column g-1-2 m-1-1\"><div class=\"_text -dark\"><div class=_heading><h3 class=_title><span class=\"hidden-chars js-hide-eol-dot\"><span id=label-grid-article-first-edition class=_original>First Edition</span></span></h3><p id=description-grid-article-first-edition class=_description>A behind-the-scenes look at our SPAN 2015 reader.</p></div></div><p aria-hidden=true class=\"source -dark\">Article / Case Study</p><div class=\"tile-icon -dark\"><svg focusable=false class=\"svg-icon tile-chevron-right\" xmlns=http://www.w3.org/2000/svg viewbox=\"0 0 24 24\"><path class=_fill-color opacity=1 fill=#000000 d=\"M9 4L7.6 5.4l6.6 6.6-6.6 6.6L9 20l8-8\"></path></svg></div></li>");
$templateCache.put("app/blog/blog.post/blog.post-old.html","<div ng-controller=\"BlogController as vm\"><div class=\"fake-header js-in-page-fake-header\"><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\"><span class=original>{{vm.currentPost.title}}</span></h1></div></div></div><div class=blog-wrapper style=\"position: relative; height: 100%;\"><div class=site-width><div layout=row layout-align=\"center start\" layout-fill><div class=blog-post-detail><div ng-bind-html=vm.myhtml></div></div></div></div></div></div>");
$templateCache.put("app/blog/blog.post/blog.post.html","<div ng-controller=\"BlogController as vm\"><div class=\"fake-header detail js-in-page-fake-header\"><div class=page-title-container></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=header-container ng-style=vm.backgroundColor><div class=\"grid-block article header\"><div class=site-width><div class=text ng-style=vm.headerTextColor><div class=heading><h1 class=title><span class=return>{{vm.currentPost.title}}</span></h1><p id=description-grid-article-introducing-resizer class=description>this is the sub headline of the article</p></div><div class=contributors>By: Cheers, Jamie</div></div></div></div></div><div class=detail-wrapper><div class=site-width><div layout=row layout-align=\"center start\"><div layout=column layout-align=\"center center\"><div class=blog-post-detail><div class=blog-detail-image><img ng-src={{vm.currentPost.image}} alt></div><div ng-bind-html=vm.myhtml></div></div></div></div></div></div></div></div></div>");
$templateCache.put("app/blog/category/category-cards.html","<div ng-controller=\"BlogController as vm\"><div class=\"fake-header js-in-page-fake-header\" ng-style=vm.backgroundColor><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\" ng-style=vm.headerTextColor><span class=original>{{vm.categoryId | capitalize: \'first\'}}</span></h1></div></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=site-width><div layout=row layout-wrap><div class=\"blog-teaser-block article\" flex=50 ng-repeat=\"blog in vm.blogData\"><a ng-href=#/{{blog.category}}/post/{{$index}} class=blog-block><div id=blog-cards-container class=card-outline><div class=\"text colorstyle light\"><div class=blog-cards-heading><h3 class=blog-title><span>{{blog.title}}</span></h3><div class=blog-description>{{blog.description}}</div></div></div><div class=blog-teaser-image><img ng-src={{blog.image}} alt></div><div class=blog-teaser-body><div class=read-more><a ng-href=#/post/{{$index}}>read more</a></div></div></div></a></div></div></div></div></div></div>");
$templateCache.put("app/blog/category/category.html","<div ng-controller=\"BlogController as vm\"><div class=\"fake-header js-in-page-fake-header\" ng-style=vm.backgroundColor><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\" ng-style=vm.headerTextColor><span class=original>{{vm.categoryId | capitalize: \'first\'}}</span></h1></div></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=site-width><div layout=row layout-wrap><div class=\"blog-teaser-block article\" flex=50 ng-repeat=\"blog in vm.blogData\"><a ng-href=#/{{blog.category}}/post/{{$index}} class=blog-block><div id=blog-teaser-container><div class=\"text colorstyle light\"><div class=blog-teaser-heading><h3 class=blog-title><span>{{blog.title}}</span></h3><div class=blog-description>{{blog.description}}</div></div></div><div class=blog-teaser-image><img ng-src={{blog.image}} alt></div><div class=blog-teaser-body><div class=read-more><a ng-href=#/post/{{$index}}>read more</a></div></div></div></a></div></div></div></div></div></div>");
$templateCache.put("app/blog/blog-main/dev-stuff/blog-main-old.html","<div class=\"wrapper js-page-wrapper\"><div ng-controller=\"BlogController as vm\"><div id=top class=\"main js-page-container\"><div class=page><div class=\"fake-header js-in-page-fake-header\"><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\"><span class=original>Yellow Noggin</span></h1></div></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=site-width><div layout=row layout-wrap><div class flex=50 ng-repeat=\"blog in vm.blogData\"><h2 class=blog-title><a ng-href=#/post/{{$index}}>{{blog.title}}</a></h2><div class=blog-id>{{blog.id}}</div><div class=blog-excerpt>{{blog.excerpt}}</div><div class=read-more><a ng-href=#/post/{{$index}}>read more</a></div></div></div></div></div><footer class=site-footer></footer></div></div></div></div></div>");
$templateCache.put("app/blog/blog-main/dev-stuff/blog-main.html","<div ng-controller=\"BlogController as vm\"><div class=\"fake-header js-in-page-fake-header\"><div class=page-title-container><div class=site-width><h1 class=\"page-title js-sticky-header-fade\"><span class=original>Yellow Noggin</span></h1></div></div></div><div class=js-animate-out><div id=main class=main-wrapper><div class=\"fake-shadow js-in-page-fake-shadow\"></div><div class=site-width><div layout=row layout-wrap><div class=\"blog-teaser-block article\" flex=50 ng-repeat=\"blog in vm.blogData\" style=\"height: 100%; position: relative;\"><a href class=blog-block><div id=blog-teaser-container><div class=\"text colorstyle\"><div class=blog-teaser-heading><h2 class=blog-title><a ng-href=#/post/{{$index}}>{{blog.title}}</a></h2><div class=blog-description>{{blog.excerpt}}</div></div></div><div class=blog-teaser-image><img ng-src={{blog.image}} alt></div><div class=blog-teaser-body><div class=read-more><a ng-href=#/post/{{$index}}>read more</a></div></div></div></a></div></div></div></div></div></div>");
$templateCache.put("app/blog/blog-main/dev-stuff/blog-teaser.html","");
$templateCache.put("app/blog/blog-main/dev-stuff/gd-teaser-all.html","<li class=\"g-column g-1-2 m-1-1\"><span id=type-grid-article-first-edition class=-off-screen>Article</span> <a data-wave=true aria-labelledby=\"type-grid-article-first-edition label-grid-article-first-edition\" aria-describedby=description-grid-article-first-edition href=\"/articles/first-edition/\" class=\"grid-block article -full-bleed -aspect-1x1 -hoverable js-grid-item\"><div class=\"_bg fill-space\" style=\"background-color: #cfced3\" aria-hidden=true></div><div class=\"_image js-responsive-image js-wave-layer\" data-src=//g-design.storage.googleapis.com/production/v5/assets/span-reader-header.jpg data-alternate-src=//g-design.storage.googleapis.com/production/v5/assets/span-reader-tile-1x1.jpg aria-hidden=true></div><div class=\"_lazy-placeholder -dark\"></div><div class=\"_text -dark\"><div class=_heading><h3 class=_title><span class=\"hidden-chars js-hide-eol-dot\"><span id=label-grid-article-first-edition class=_original>First Edition</span> <span class=\"_dotted js-dotted\" aria-hidden=true>First<span class=\"_dot js-dot\"></span>Edition<span class=_return></span></span></span></h3><p id=description-grid-article-first-edition class=_description>A behind-the-scenes look at our SPAN 2015 reader.</p></div></div><p aria-hidden=true class=\"source -dark\">Article / Case Study</p><div class=\"tile-icon -dark\"><svg focusable=false class=\"svg-icon tile-chevron-right\" xmlns=http://www.w3.org/2000/svg viewbox=\"0 0 24 24\"><path class=_fill-color opacity=1 fill=#000000 d=\"M9 4L7.6 5.4l6.6 6.6-6.6 6.6L9 20l8-8\"></path></svg></div></a></li>");
$templateCache.put("app/blog/blog-main/dev-stuff/gd-teaser.html","<li class=\"g-column g-1-2 m-1-1\"><div class=\"_text -dark\"><div class=_heading><h3 class=_title><span class=\"hidden-chars js-hide-eol-dot\"><span id=label-grid-article-first-edition class=_original>First Edition</span></span></h3><p id=description-grid-article-first-edition class=_description>A behind-the-scenes look at our SPAN 2015 reader.</p></div></div><p aria-hidden=true class=\"source -dark\">Article / Case Study</p><div class=\"tile-icon -dark\"><svg focusable=false class=\"svg-icon tile-chevron-right\" xmlns=http://www.w3.org/2000/svg viewbox=\"0 0 24 24\"><path class=_fill-color opacity=1 fill=#000000 d=\"M9 4L7.6 5.4l6.6 6.6-6.6 6.6L9 20l8-8\"></path></svg></div></li>");}]);
