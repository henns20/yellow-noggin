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
