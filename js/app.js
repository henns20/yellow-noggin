var vcard;
(function (vcard) {
    'use strict';
    angular.module('vcard', [
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngMaterial'
    ]);
})(vcard || (vcard = {}));

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

angular.module("vcard").run(["$templateCache", function($templateCache) {$templateCache.put("vcard-app/partials/vcard-bottom-blog.tmpl.html","<md-content class=md-whiteframe-glow-z1><div layout=row class=card-top style=\"background-color: #ffffff\" layout-wrap layout-align=\"center center\"><div class><h1>Blog Partial</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div></div></md-content>");
$templateCache.put("vcard-app/partials/vcard-bottom-contact.tmpl.html","<md-content class=md-whiteframe-glow-z1><div layout=row class=card-top style=\"background-color: #ffffff\" layout-wrap layout-align=\"center center\"><div class><h1>Contact Partial</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div></div></md-content>");
$templateCache.put("vcard-app/partials/vcard-bottom-portfolio.tmpl.html","<md-content class=md-whiteframe-glow-z1><div layout=row class=card-top style=\"background-color: #ffffff\" layout-wrap layout-align=\"center center\"><div class><h1>Portfolio Partial</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div></div></md-content>");
$templateCache.put("vcard-app/partials/vcard-bottom-resume.tmpl.html","<md-content class=md-whiteframe-glow-z1><div layout=row class=card-top style=\"background-color: #ffffff\" layout-wrap layout-align=\"center center\"><div class><h1>Resume Partial</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div></div></md-content>");
$templateCache.put("vcard-app/partials/vcard-home-top.tmpl.html","<md-content class=md-whiteframe-glow-z1><div layout=row class=\"card-top background-yn\" style layout-wrap layout-align=\"center center\"><div layout=row flex=90 flex-gt-sm=60 layout-wrap><div layout=column flex=100 flex-gt-xs=40><div style=\"margin-top: 20px;\"><div class=\"image-placeholder md-whiteframe-glow-z1\" style=\"height: 185px; width: 165px; background-color: #eeeeee\"><img src=../images/me-185.jpeg alt></div></div></div><div layout=column style=\"padding: 0 10px;\" flex=100 flex-gt-xs=60><h1 style=\"margin-bottom: 0px; font-family: \'open Sans\', Arial; font-weight: 800; color: #fff; text-shadow: 1px 1px 2px #aaa;\">John Hennelly</h1><h3 style=\"margin-bottom: 0px; margin-top: 5px; color: #fff; text-shadow: 1px 1px 2px #aaa;\">Full Stack Javascript+</h3><p class=smaller-font>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div></div><div layout=column class=smaller-font style flex=90 flex-gt-sm=40><ul class=personal-info style=\"list-style: none\"><li><label for>Name</label> <span>John Jamie Hennelly</span></li><li><label>Location</label> <span>Spruce st, Philadelphia, Pa</span></li><li><label for>E-mail</label> <span>jjhennelly@gmail.com</span></li><li><label for>Phone</label> <span>267-626-6507</span></li><li><label for>Website</label> <span>dkindred.com</span></li></ul></div></div></md-content>");
$templateCache.put("vcard-app/partials/vcard-middle.tmpl.html","<md-content class=md-whiteframe-glow-z1><div><div layout=row class=card-bottom layout-align=\"center center\"><md-button ui-sref=dkworkshop-ws-vcard.home><md-icon class=card-bottom-icons aria-div=Menu>person</md-icon><div class=icons-caption>Home</div></md-button><md-button ui-sref=dkworkshop-ws-vcard.portfolio><md-icon class=card-bottom-icons aria-div=Menu>widgets</md-icon><div class=icons-caption>Portfolio</div></md-button><md-button ui-sref=dkworkshop-ws-vcard.resume><md-icon class=card-bottom-icons aria-div=Menu>business_center</md-icon><div class=icons-caption>Resume</div></md-button><md-button ui-sref=dkworkshop-ws-vcard.blog><md-icon class=card-bottom-icons aria-div=Menu>hdr_weak</md-icon><div class=icons-caption>Blog</div></md-button><md-button ui-sref=dkworkshop-ws-vcard.contact><md-icon class=card-bottom-icons aria-div=Menu>mail_outline</md-icon><div class=icons-caption>Contact</div></md-button></div></div></md-content>");
$templateCache.put("vcard-app/partials/vcard.tmpl.html","<div layout=column layout-fill><section id=container><div layout=column layout-fill><md-toolbar style=\"background-color: transparent;\" md-scroll-shrink md-shrink-speed-factor=0.5><div layout=row class=social-media layout-align=\"end bottom\"><md-button class=social-media-buttons href=# ng-disabled=false aria-label=description md-no-ink=false md-ripple-size=full><i class=\"fa fa-google-plus\" aria-hidden=true></i></md-button><md-button class=social-media-buttons href=#/dkpagetemplates ng-disabled=false aria-label=description md-no-ink=false md-ripple-size=full><i class=\"fa fa-linkedin\" aria-hidden=true></i></md-button><md-button class=social-media-buttons href=#/dkpagetemplates ng-disabled=false aria-label=description md-no-ink=false md-ripple-size=full><i class=\"fa fa-twitter\" aria-hidden=true></i></md-button></div></md-toolbar><div ui-view=cardTop class=our_content></div><md-content class=md-whiteframe-glow-z1><div><div layout=row class=card-bottom layout-align=\"center center\"><md-button ui-sref=vcard.home><md-icon class=card-bottom-icons aria-div=Menu>person</md-icon><div class=icons-caption>Home</div></md-button><md-button ui-sref=vcard.portfolio><md-icon class=card-bottom-icons aria-div=Menu>widgets</md-icon><div class=icons-caption>Portfolio</div></md-button><md-button ui-sref=vcard.resume><md-icon class=card-bottom-icons aria-div=Menu>business_center</md-icon><div class=icons-caption>Resume</div></md-button><md-button ui-sref=vcard.blog><md-icon class=card-bottom-icons aria-div=Menu>hdr_weak</md-icon><div class=icons-caption>Blog</div></md-button><md-button ui-sref=vcard.contact><md-icon class=card-bottom-icons aria-div=Menu>mail_outline</md-icon><div class=icons-caption>Contact</div></md-button></div></div></md-content><div ui-view=cardBottom class=\"card-bottom-view our_content\"></div></div></section></div>");}]);