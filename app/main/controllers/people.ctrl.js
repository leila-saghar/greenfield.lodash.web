(function () {
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
            
            $http({
                method: 'jsonp',
                url: 'http://agl-developer-test.azurewebsites.net/people.json',
                params: {
                    format: 'jsonp',
                    callback: 'JSON_CALLBACK'
                }
            }).success(function (data) {
                vm.people = _.groupBy(data, 'gender');

                var males = _.filter(data, function (item) { return item.gender === 'Male'; });
                var females = _.filter(data, function (item) { return item.gender === 'Female'; });

                vm.maleCatsSorted = _.chain(males)
                        .map(function (maleItm) {
                            return maleItm.pets;
                        })
                        .flatten(true)
                        .filter(function (pet) { return (pet && pet.type === 'Cat'); })
                        .sortBy('name')
                        .value();

                console.log(vm.maleCatsSorted);

                vm.femaleCatsSorted = _.chain(females)
                            .map(function (maleItm) {
                                return maleItm.pets;
                            })
                            .flatten(true)
                            .filter(function (pet) { return (pet && pet.type === 'Cat'); })
                            .sortBy('name')
                            .value();

                console.log(vm.femaleCatsSorted);
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
