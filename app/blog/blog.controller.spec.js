/* jshint -W117, -W030 */
describe('BlogController', function() {
    var controller,
    vm = {},
    $q;

    var blogData = [
    	{
    		"title": "First Post",
    		"excerpt": "Lorem ipsum dolor sit amet.",
    		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas nisi odio neque aliquam magni explicabo sint iste incidunt minus itaque ducimus voluptas similique eos natus nobis alias quam accusamus, aspernatur doloremque amet, nesciunt esse velit. Repudiandae sunt dolorem esse eum, qui aliquid pariatur velit enim autem temporibus minima cumque ipsa in, accusantium sed deleniti natus sequi illo nihil ipsum quam est sit dignissimos itaque quo? Aperiam qui et harum porro eligendi dolore tempora accusamus culpa voluptate animi aliquid alias necessitatibus quod ipsam hic, dolorem expedita suscipit, nobis quas quia. A eum ullam alias saepe accusantium deleniti doloremque tempora assumenda error ipsam incidunt quam optio itaque atque minima eos dicta quidem officiis, obcaecati architecto voluptas, debitis illo consequatur?"
    	}, {
    		"title": "Second Post",
    		"excerpt": "Lorem ipsum dolor sit amet.",
    		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit voluptatum laudantium soluta deserunt optio voluptatibus quod facilis ab excepturi libero. Dolore quidem quia reprehenderit explicabo, pariatur ad, repudiandae sit. Explicabo facere odio consectetur excepturi. Similique non, atque impedit? Dolor alias, numquam, quia inventore, dolorem nobis nemo ipsam asperiores recusandae fugit tempora ducimus, provident vitae quae! Iste accusantium hic voluptatem, maiores quo suscipit veniam placeat dolorem. Quidem ducimus, est velit beatae quae eveniet laboriosam atque vero consequatur sed! Libero."
    	}, {
    		"title": "Third Post",
    		"excerpt": "Lorem ipsum dolor sit amet.",
    		"content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro repudiandae ut nostrum ab tenetur maiores illum ipsa vitae iste earum, commodi, voluptatibus quisquam saepe. Esse ab mollitia tempora expedita, assumenda aperiam nobis? Ipsa obcaecati autem, sit magnam magni consequuntur veritatis praesentium veniam nulla dolores repellat doloribus voluptatibus itaque aperiam. Suscipit accusantium, eligendi tempora error minus, nemo, obcaecati quam sapiente inventore eaque eius voluptatum nesciunt! Accusamus repellendus explicabo labore ipsa eligendi fuga."
    	}
    ];


    // var people = mockData.getMockPeople();

    beforeEach(function() {
          module('yn.blog');
    });

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_) {
      controller = _$controller_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    }));

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

    // bard.verifyNoOutstandingHttpRequests();

    describe('Blog controller', function() {
        it('should be created successfully', function () {
              vm = controller('BlogController', {BlogFactory: bf});
              expect(vm).toBeDefined();
        });

        describe('after activate', function() {

            it('should have basic bindings working title of BlogController', function () {
              vm = controller('BlogController', {BlogFactory: bf});
              expect(vm.title).toBe('Jamie\'s Blog');
            });


            it('should call getBlogData(BlogFactory.getBlogs service) & store its response'  +
                'in vm.blogData property for main blog page ngrepeat', function () {
              vm = controller('BlogController', {BlogFactory: bf});
              $rootScope.$apply();
              expect(vm.blogData.length).toEqual(blogData.length);
            });
            describe("blog posts", function () {

              it("should work with stateparams service", function () {
                var stateParams  = { postId: 1 };

                vm = controller('BlogController', {BlogFactory: bf, $stateParams: stateParams});
                $rootScope.$apply();
                expect(vm.currentPost.title).toEqual(blogData[1].title);
              });

            });
        });
    });
});
