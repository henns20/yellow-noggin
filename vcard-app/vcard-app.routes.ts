namespace vcard {
    'use strict';

    angular
        .module('vcard')
        .config(initRouter);


    /**
     * Initialize the router's default behaviors
     */
    // @ngInject
    function initRouter($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void {

        $urlRouterProvider.otherwise('/');

        // https://github.com/angular-ui/ui-router/issues/163
        $stateProvider
            .state('vcard', {
                // abstract: true,
                // url: '/',
                views: {
                    "content": {
                        templateUrl: '/vcard-app/partials/vcard.tmpl.html'
                        // template: 'testing testing 123 middle'
                    }
                }

            })
            .state('vcard.home', {
                url: '/',
                views: {
                    "cardTop": {
                        templateUrl: '/vcard-app/partials/vcard-home-top.tmpl.html'
                    },
                    "cardMiddle": {

                        templateUrl: '/vcard-app/partials/vcard-middle.tmpl.html'
                    }

                }

            })
            .state('vcard.portfolio', {
                url: '/portfolio',
                views: {
                    "cardBottom": {
                        // template: 'testing testing 123'
                        templateUrl: '/vcard-app/partials/vcard-bottom-portfolio.tmpl.html'
                    },
                    "cardMiddle": {
                        // template: 'testing testing 123 middle'
                        templateUrl: '/vcard-app/partials/vcard-middle.tmpl.html'
                    }                    // "cardBottom": {
                    //     template: 'testing testing 123 card bottom'
                    //     // templateUrl: '/vcard-app/partials/vcard-home.tmpl.html'
                    // }
                }

            })
            .state('vcard.resume', {
                url: '/resume',
                views: {
                    "cardBottom": {
                        // template: 'testing testing 123'
                        templateUrl: '/vcard-app/partials/vcard-bottom-resume.tmpl.html'
                    },
                    "cardMiddle": {
                        // template: 'testing testing 123 middle'
                        templateUrl: '/vcard-app/partials/vcard-middle.tmpl.html'
                    }                    // "cardBottom": {
                    //     template: 'testing testing 123 card bottom'
                    //     // templateUrl: '/vcard-app/partials/vcard-home.tmpl.html'
                    // }
                }

            })
            .state('vcard.blog', {
                url: '/blog',
                views: {
                    "cardBottom": {
                        templateUrl: '/vcard-app/partials/vcard-bottom-blog.tmpl.html'
                    },
                    "cardMiddle": {
                        templateUrl: '/vcard-app/partials/vcard-middle.tmpl.html'
                    }
                }

            })
            .state('vcard.contact', {
                url: '/contact',
                views: {
                    "cardBottom": {
                        templateUrl: '/vcard-app/partials/vcard-bottom-contact.tmpl.html'
                    },
                    "cardMiddle": {
                        templateUrl: '/vcard-app/partials/vcard-middle.tmpl.html'
                    }
                }

            });


    }


}
