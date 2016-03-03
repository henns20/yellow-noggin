(function () {
  'use strict';

  angular
    .module('yn.core')
    .controller('CoreController', ['coreService', '$state', '$q', '$scope', '$rootScope', CoreController]);

  function CoreController(coreService, $state, $q, $scope, $rootScope) {
    var vm = this;
    vm.controllerName = 'CoreController';
    vm.state = $state;
    vm.isHomeState =  checkIfHomeState();
    // vm.isHomeState = undefined; TODO: see if this reveal convention is proper
    vm.headerHeight = getHeaderHeight();




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
