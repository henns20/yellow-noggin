describe("BlogFactory", function () {
  var view = 'app/blogi/blog-main/blog-main.html',
  // $templateCache,
  // $rootScope;
  $httpBackend,
  BlogFactory;


  beforeEach(module('yn.blog'));

  // beforeEach(inject(function (_$state_, _$templateCache_, _$rootScope_) {
  //   $state = _$state_;
  //   $templateCache = _$templateCache_;
  //   $rootScope = _$rootScope_;
  // }));

  beforeEach(inject(function (_BlogFactory_, _$httpBackend_) {
    BlogFactory = _BlogFactory_;
    $httpBackend = _$httpBackend_;
  }));


  beforeEach(function () {
      // $templateCache.put(view, '');
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    // $httpBackend.verifyNoOutstandingRequest();
  });

  describe("Activation", function () {

    it("should be created", function () {
      expect('BlogFactory').toBeDefined();
    });

    describe("After Activation", function () {

       it("getBlogs requests the proper url", function () {
         var response;
         $httpBackend.when('GET', './app/assets/mock-data/mock-blogs.json')
            .respond(200, '["some data"]');

          BlogFactory.getBlogs()
          .then(function (data) {
            response = data;
          });

          $httpBackend.flush();
          expect(response).toEqual(["some data"]);
     });

       it("getBlogs reports an error if server fails ", function () {
         var response;
          $httpBackend.when('GET', './app/assets/mock-data/mock-blogs.json')
             .respond(500, {description: "you failed!"});

           BlogFactory.getBlogs()
           .catch(function (errorMessage) {
            response = errorMessage;

           });

           $httpBackend.flush();
             expect(response).toEqual('query for blogs. you failed!');
       });
     });

  });
});
