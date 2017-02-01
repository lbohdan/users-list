(function() {
    'use strict';

    angular.module('testTask')
        .config(routes);

    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/',
                template: '<tt-main-wrapper class="tt-main-wrapper tt-row tt-component"></tt-main-wrapper>'
            })
            .state('app.users', {
                url: 'users',
                views: {
                    content: {
                        template: '<tt-users data-users="$resolve.users"></tt-users>'
                    }
                },
                resolve: {
                    users: function(UsersDataService) {
                        return UsersDataService.resolver();
                    }
                }
            });

        $urlRouterProvider.otherwise('/users');
    }
}());
