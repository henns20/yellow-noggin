describe("description", function () {
  var view = 'app/blog/blog-main/blog-main.html',
  $state,
  $templateCache,
  $rootScope;

  beforeEach(module('yn.blog'));

  beforeEach(inject(function (_$state_, _$templateCache_, _$rootScope_) {
    $state = _$state_;
    $templateCache = _$templateCache_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function () {
      $templateCache.put(view, '');
  });

  describe("blog state", function () {
    it("should map state blog to url / ", function () {
      expect($state.href('blog', {})).toEqual('#/');
    });

    it("should map /blog-main route to the blog-main template", function () {
      expect($state.get('blog').views.main_content.templateUrl).toEqual(view);
    });

    it("blog-main should work with state.go", function () {
      $state.go('blog');
      $rootScope.$apply();
      expect($state.is('blog'));
    });

  });


  // describe("blog-post state", function () {
  //
  //   it("should map state blog-post to url / ", function () {
  //     expect($state.href('blog-main', {})).toEqual('#/');
  //   });
  //
  //   it("should map /blog-post route to the blog-detail template", function () {
  //     expect($state.get('blog-main').views.main_content.templateUrl).toEqual(view);
  //   });
  //
  //   it("blog-detail should work with state.go", function () {
  //     $state.go('blog-detail');
  //     $rootScope.$apply();
  //     expect($state.is('blog-detail'));
  //   });
  //
  // });
});
