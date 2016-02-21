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
