/* jshint -W117, -W030 */
describe('BlogController', function() {
    var controller,
    vm = {},
    view = 'app/blog/blog-main/blog-main.html',
    $q,
    $state,
    $templateCache;

var blogData = [
  {
    "title": "Test Title 1",
    "category": "development",
    "excerpt": "LoremLorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem quaerat praesentium iusto distinctio impedit soluta error, perferendis blanditiis molestias laboriosam maxime optio quis autem nisi dolores atque et illum sint.",
    "content": "<div class=\"test-class\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus in illo accusamus, ut, id earum cupiditate fugiat laudantium, architecto labore iusto dolore. Veritatis beatae, excepturi doloribus aliquid odit, obcaecati nulla!</div><div class=\"test-class2\">Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipisicing elit. Minus in illo accusamus, ut, id earum cupiditate fugiat laudantium, architecto labore iusto & dolore. Veritatis beatae, excepturi doloribus aliquid odit, obcaecati nulla!</div><ul><li>list 1</li><li>list name 2</li><li>list name 3</li></ul>"
  },
  {
    "title": "Test Title 0",
    "category": "marketeering",
    "excerpt": "Test excerptLorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem quaerat praesentium iusto distinctio impedit soluta error, perferendis blanditiis molestias laboriosam maxime optio quis autem nisi dolores atque et illum sint.",
    "content": "<div class=\"test-class\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus in illo accusamus, ut, id earum cupiditate fugiat laudantium, architecto labore iusto dolore. Veritatis beatae, excepturi doloribus aliquid odit, obcaecati nulla!</div><div class=\"test-class2\">Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipisicing elit. Minus in illo accusamus, ut, id earum cupiditate fugiat laudantium, architecto labore iusto & dolore. Veritatis beatae, excepturi doloribus aliquid odit, obcaecati nulla!</div><ul><li>list 1</li><li>list name 2</li><li>list name 3</li></ul>"
  },
  {
    "title": "Test Title 0",
    "category": "development",
    "excerpt": "Test excerptLorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem quaerat praesentium iusto distinctio impedit soluta error, perferendis blanditiis molestias laboriosam maxime optio quis autem nisi dolores atque et illum sint.",
    "content": "<div class=\"test-class\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus in illo accusamus, ut, id earum cupiditate fugiat laudantium, architecto labore iusto dolore. Veritatis beatae, excepturi doloribus aliquid odit, obcaecati nulla!</div><div class=\"test-class2\">Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipisicing elit. Minus in illo accusamus, ut, id earum cupiditate fugiat laudantium, architecto labore iusto & dolore. Veritatis beatae, excepturi doloribus aliquid odit, obcaecati nulla!</div><ul><li>list 1</li><li>list name 2</li><li>list name 3</li></ul>"
  }
];


    // var people = mockData.getMockPeople();

    beforeEach(function() {
          module('yn.blog');
    });

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$state_, _$templateCache_) {
      controller = _$controller_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $templateCache = _$templateCache_;
    }));

    beforeEach(function () {
        $templateCache.put(view, '');
    });

    // Test help data
    /**
     *     mock of blog factory service
     *     we don't need to know here is making the call properly(http call)
     *     (1)we need to know that it's calling service
     *     (2)it's processing the data return properly
     *     (3)and making the proper bindings for the view
     */
    var bf = {
      getBlogs: function () {
        return $q.when(blogData);
      }
    };
    var onlyDevelopmentPosts = function (arr) {
      return arr.some(function (el) {
        return el.category === 'development';
      });
    };
    var onlyMarketeeringPosts = function (arr) {
      return arr.some(function (el) {
        return el.category === 'marketeering';
      });
    };

    // bard.verifyNoOutstandingHttpRequests();

    describe('Blog controller', function() {
        // it('should be created successfully', function () {
        //       vm = controller('BlogController', {BlogFactory: bf});
        //       expect(vm).toBeDefined();
        // });

        describe('after activate', function() {

            it('should have basic bindings working title of BlogController', function () {
              vm = controller('BlogController', {BlogFactory: bf});
              expect(vm.title).toBe('Jamie\'s Blog');
            });

            it('should call getBlogData(getBlogs service) & store response in vm.blogData for main page ngrepeat', function () {
              vm = controller('BlogController', {BlogFactory: bf});
              $rootScope.$apply();
              expect(vm.blogData.length).toEqual(blogData.length);
            });

            it("should not call getCurrentPost if postId is an undefined(on main blog page)", function () {
              var stateParams  = { postId: undefined };
              vm = controller('BlogController', {BlogFactory: bf, $stateParams: stateParams});
              vm.callTest = 1;

              spyOn(vm, 'getCurrentPost').and.callFake(function () {
                // dump('fake function called');
                vm.callTest = 3;
              });

              spyOn(vm, 'getMainBlogData').and.callFake(function () {
                // dump('fake getBlogData function called');
                vm.callTest = 5;
              });

              vm.initialize(vm.postId);
              $rootScope.$apply;
              expect(vm.callTest).toEqual(5);

            });

            describe('category posts', function () {

              it('should get only development category posts', function () {
                var stateParams  = { categoryId: 'development' };
                vm = controller('BlogController', {BlogFactory: bf, $stateParams: stateParams});
                $rootScope.$apply();
                expect(onlyDevelopmentPosts(vm.developmentPosts)).toEqual(true);
              });

              it('should get only marketeering category posts', function () {
                var stateParams  = { categoryId: 'marketeering' };
                vm = controller('BlogController', {BlogFactory: bf, $stateParams: stateParams});
                $rootScope.$apply();
                expect(onlyMarketeeringPosts(vm.marketeeringPosts)).toEqual(true);
              });

            });
            describe('blog posts', function () {

              it('should call vm.getCurrentPost and store post id blog data when stateparams provided, ', function () {
                var stateParams  = { postId: 1 };
                vm = controller('BlogController', {BlogFactory: bf, $stateParams: stateParams});
                $rootScope.$apply();
                expect(vm.currentPost.title).toEqual(blogData[1].title);
              });

            });
        });
    });
});
