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
