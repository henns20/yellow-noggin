var vcard;
(function (vcard) {
    'use strict';
    angular
        .module('vcard')
        .config(initRouter);
    function initRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('vcard', {
            views: {
                "content": {
                    templateUrl: '/vcard-app/partials/vcard.tmpl.html'
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
                    templateUrl: '/vcard-app/partials/vcard-bottom-portfolio.tmpl.html'
                },
                "cardMiddle": {
                    templateUrl: '/vcard-app/partials/vcard-middle.tmpl.html'
                }
            }
        })
            .state('vcard.resume', {
            url: '/resume',
            views: {
                "cardBottom": {
                    templateUrl: '/vcard-app/partials/vcard-bottom-resume.tmpl.html'
                },
                "cardMiddle": {
                    templateUrl: '/vcard-app/partials/vcard-middle.tmpl.html'
                }
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
})(vcard || (vcard = {}));
