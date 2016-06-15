(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
        'ngResource',
        // Custom modules 
      //  'dataMockApp',
        // 3rd Party Modules
        'ui.router',
       
    ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',

            function ($stateProvider, $urlRouterProvider, $httpProvider) {                
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
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
})(); (function () {
    'use strict';
    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$state','$location'];


    function homeCtrl($state, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.showPoeple = function () {
            $state.go('people');
        };
        vm.currentPath = function () { return $location.path() === '/'; };
        vm.show = $location.url() == '/';
    }
})(); (function () {
    'use strict';

    angular
        .module('app')
        .controller('peopleCtrl', peopleCtrl);

    peopleCtrl.$inject = ['$state', 'dataSvc', '$http'];

    function peopleCtrl($state, dataSvc, $http) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'People details';
        vm.people = [];
        vm.errorMessage = '';
        getPeople();

        function getPeople() {
            //dataSvc.get().then(function (data) {
            //    vm.people = _.groupBy(data, 'gender');
            //});
            $http({
                method: 'jsonp',
                url: 'http://agl-developer-test.azurewebsites.net/people.json',
                params: {
                    format: 'jsonp',
                    callback: 'JSON_CALLBACK'
                }
            }).success(function (data) {
                vm.people = _.groupBy(data, 'gender');
            }).error(function (data, status) {
                // Handle HTTP error
                vm.errorMessage = "an error occured.";
                        })
            .finally(function () {
                // Execute logic independent of success/error
            })
            .catch(function (error) {
                // Catch and handle exceptions from success/error/finally functions
            });
        }
    }
})();
 (function () {
    'use strict';

    angular
        .module('app')
        .factory('dataSvc', dataSvc);

    dataSvc.$inject = ['$resource', '$q','$http'];

    function dataSvc($resource, $q, $http) {
        var service = {
            get: _get
        };
       
        return service;        

        function _get() {
           
            var config = { format: 'jsonp', callback: 'JSON_CALLBACK', headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With' } };
            var resource = $resource('http://agl-developer-test.azurewebsites.net/people.json', config);
           
            var deferred = $q.defer();
            resource.query({},
				function (data) {
				    deferred.resolve(data);
				},
				function (error) {
				    deferred.reject(error);
				});
            return deferred.promise;        
        }  
    }
})();