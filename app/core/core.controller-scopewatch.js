(function () {
  'use strict';

  angular
    .module('yn.core')
    .controller('CoreController', ['coreService', '$state', '$q', '$scope', '$rootScope', CoreController]);

  function CoreController(coreService, $state, $q, $scope, $rootScope) {
    var vm = this;
    vm.controllerName = 'CoreController';
    vm.state = $state;
    vm.currentStateName = vm.state.current.name;

        $scope.$watch('vm.state.current.name', function (x, y) {
    console.log(x, 'x');
    console.log(y, 'y');
        console.log(vm.state.current.name, 'checking current state name inside watch');
      });



    // vm.currentState = $state.current.name;
    //
    //   $scope.$watch('vm.state.current.name', function (x, being) {
    //     console.log(x, 'this is the x param');
    //     console.log(being, 'this is the being param');
    //     if (x === 'blog') {
    //
    //       vm.isHomeState = true;
    //       console.log(vm.isHomeState, 'inside true');
    //     } else {
    //
    //       vm.isHomeState = false;
    //       console.log(vm.isHomeState, 'inside else block');
    //     }
    //     console.log(vm.isHomeState, 'inside watch');
    //   // vm.showTitleInMenuBar = vm.isHomeState;
    //
    //   });


// $rootScopeit




    // console.log(vm.currentState, 'checking state nameg');
    // console.log($state, 'checking state');

    // if($state.current.name) {
    //   vm.isHomeState = $state.current.name;
    // }
    //

    // checkIfHomeState($state);
    //
    // function checkIfHomeState(currentState) {
    //   console.log(currentState);
    //   if(currentState.current.name === 'blog') {
    //     vm.isHomeState = true;
    //   } else {
    //     vm.isHomeState = false;
    //   }
    // }
// vm.state = {};
// if ($state) {
// changeState($state);
// }

    //
    // // can this be simplified in service(core)?

  // vm.checkIfHomeState = checkIfHomeState;
  // checkIfHomeState();
//   $scope.$watch('vm.state.current.name', function (x, being) {
//     console.log(x, 'this is the x param');
//     console.log(being, 'this is the being param');
//     if (x === 'blog') {
//
//       vm.isHomeState = true;
//       console.log(vm.isHomeState, 'inside true');
//     } else {
//
//       vm.isHomeState = false;
//       console.log(vm.isHomeState, 'inside else block');
//     }
//     console.log(vm.isHomeState, 'inside watch');
//   vm.showTitleInMenuBar = vm.isHomeState;
//
//   });
//
// function changeState(stateService) {
//   vm.state = stateService;
//   console.log(vm.state, 'change state function');
// }

// checkIfHomeState();
    // angular.extend(vm, {
    //   checkIfHomeState: checkIfHomeState
    // });
    //
    // activate();
    //
    // function activate() {

    // }

/**
 * checkIfHomeState - sayers bouillon value in is home finding
 *
 * @return {leon}  description
 */






}
})();
