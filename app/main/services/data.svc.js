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