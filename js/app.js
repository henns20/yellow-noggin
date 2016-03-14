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
    .controller('CoreController', ['coreService', '$state', '$q', '$scope', '$rootScope', CoreController]);

  function CoreController(coreService, $state, $q, $scope, $rootScope) {
    var vm = this;
    vm.controllerName = 'CoreController';
    vm.state = $state;
    vm.currentStateName = vm.state.current.name;

        $scope.$watch('vm.state.current.name', function (x, y) {
    console.log(x, 'x');
    console.log(y, 'y');
        console.log(vm.state.current.name, 'checking current state name inside watch');
      });



    // vm.currentState = $state.current.name;
    //
    //   $scope.$watch('vm.state.current.name', function (x, being) {
    //     console.log(x, 'this is the x param');
    //     console.log(being, 'this is the being param');
    //     if (x === 'blog') {
    //
    //       vm.isHomeState = true;
    //       console.log(vm.isHomeState, 'inside true');
    //     } else {
    //
    //       vm.isHomeState = false;
    //       console.log(vm.isHomeState, 'inside else block');
    //     }
    //     console.log(vm.isHomeState, 'inside watch');
    //   // vm.showTitleInMenuBar = vm.isHomeState;
    //
    //   });


// $rootScopeit




    // console.log(vm.currentState, 'checking state nameg');
    // console.log($state, 'checking state');

    // if($state.current.name) {
    //   vm.isHomeState = $state.current.name;
    // }
    //

    // checkIfHomeState($state);
    //
    // function checkIfHomeState(currentState) {
    //   console.log(currentState);
    //   if(currentState.current.name === 'blog') {
    //     vm.isHomeState = true;
    //   } else {
    //     vm.isHomeState = false;
    //   }
    // }
// vm.state = {};
// if ($state) {
// changeState($state);
// }

    //
    // // can this be simplified in service(core)?

  // vm.checkIfHomeState = checkIfHomeState;
  // checkIfHomeState();
//   $scope.$watch('vm.state.current.name', function (x, being) {
//     console.log(x, 'this is the x param');
//     console.log(being, 'this is the being param');
//     if (x === 'blog') {
//
//       vm.isHomeState = true;
//       console.log(vm.isHomeState, 'inside true');
//     } else {
//
//       vm.isHomeState = false;
//       console.log(vm.isHomeState, 'inside else block');
//     }
//     console.log(vm.isHomeState, 'inside watch');
//   vm.showTitleInMenuBar = vm.isHomeState;
//
//   });
//
// function changeState(stateService) {
//   vm.state = stateService;
//   console.log(vm.state, 'change state function');
// }

// checkIfHomeState();
    // angular.extend(vm, {
    //   checkIfHomeState: checkIfHomeState
    // });
    //
    // activate();
    //
    // function activate() {

    // }

/**
 * checkIfHomeState - sayers bouillon value in is home finding
 *
 * @return {leon}  description
 */






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
