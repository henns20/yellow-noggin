/* jshint -W117, -W030 */
describe('CoreController', function() {
    var controller,
    vm = {},
    viewHome = 'app/blog/blog-main/blog-main.html',
    viewPost = 'app/blog/blog.post/blog.post.html',
    $q,
    $state,
    $templateCache,
    $scope,
    $rootScope;



    // var people = mockData.getMockPeople();

    beforeEach(function() {
          module('yn.core', 'yn.blog');
        });

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$state_, _$templateCache_) {
      controller = _$controller_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      $templateCache = _$templateCache_;

    }));

    beforeEach(function () {
      // $templateCache.put(view, '');
      // $templateCache.put(view, '');
    });



    describe('Core controller', function() {
        it('should be created successfully', function () {
              vm = controller('CoreController', {$scope: $scope});
              expect(vm).toBeDefined();
        });

        describe('after activate', function() {

            it('should have basic bindings working title of CoreController', function () {
              vm = controller('CoreController', {$scope: $scope});
              expect(vm.controllerName).toBe('CoreController');
            });

            it('should check and store is home blog state for dynamic html(header height, site title )', function () {
              $templateCache.put(viewHome, '');
              $state.go('blog');
              $rootScope.$apply();
              vm = controller('CoreController', {$scope: $scope});

              expect(vm.currentStateName).toEqual('blog');
              dump(vm.state.current.name);
              $templateCache.put(viewPost, '');
              $state.go('blog-post');
              $rootScope.$apply();
              vm.state = $state;
                            dump(vm.state.current.name);
              $rootScope.$apply();
              dump(vm.currentStateName);
              expect(vm.currentStateName).toEqual('blog-post');

            });

            it('should check and store is home blog state for dynamic html(header height, site title )', function () {
              $templateCache.put(viewPost, '');
              $state.go('blog-post');
              $rootScope.$apply();
              vm = controller('CoreController', {$scope: $scope});

              expect(vm.currentStateName).toEqual('blog-post');
            });

        });

  });
});
