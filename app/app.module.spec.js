
/**
 * just checking to see if yn is created working
 */


describe("description", function () {
  var view = 'app/blog/blog-main/blog-main.html',
  $state,
  $templateCache,
  $rootScope;

  beforeEach(module('yn'));

  beforeEach(inject(function (_$state_, _$templateCache_, _$rootScope_) {
    $state = _$state_;
    $templateCache = _$templateCache_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(function () {
      // $templateCache.put(view, '');
  });

  it("should map state blog-main to url / ", function () {
    // expect($state.href('blog-main', {})).toEqual('#/');
    expect(true).toEqual(false);
  });

  // it("should map /blog-howe route to the blog-home template", function () {
  //
  // });20
  //
  // it("blog-home should work with state.go", function () {
  //
  // });

});
