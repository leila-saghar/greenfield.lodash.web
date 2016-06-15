(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
        'ngResource',
        // Custom modules 
        // 'dataMockApp',
        // 3rd Party Modules
        'ui.router',
       
    ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',

            function ($stateProvider, $urlRouterProvider, $httpProvider) {                
              
            $urlRouterProvider.otherwise("/");

            $stateProvider
              // route for the home page
              .state('home', {
                  url: '/',
                  templateurl: 'index.html',
                  controller: 'homeCtrl',
                  controllerAs: 'vm'
              })
            .state('people', {
                url: '/people',
                templateUrl: 'app/main/views/people.html',
                controller: 'peopleCtrl',
                controllerAs: 'vm'
            }).state('aboutus', {
                url: '/aboutus',
                templateUrl: 'app/main/views/aboutus.html',                     
            });
        }]);
})();