(function () {
    'use strict';

    angular.module('testTask')
        .config(config);

    function config($locationProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://jsonplaceholder.typicode.com');
    }
}());
