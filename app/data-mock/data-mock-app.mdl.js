(function () {
    'use strict';

    var dataMockApp = angular.module('dataMockApp', [        
        'ngResource',
        'ngMockE2E'       
        
    ]); dataMockApp.run(['$httpBackend', function ($httpBackend) {

        var people = [
            {
                "name": "Bob", "gender": "Male", "age": 23,
                "pets": [{ "name": "Garfield", "type": "Cat" }, { "name": "Fido", "type": "Dog" }]},
            {
                "name": "Jennifer", "gender": "Female", "age": 18,
                "pets": [{ "name": "Garfield", "type": "Cat" }]
            },
            { "name": "Steve", "gender": "Male", "age": 45, "pets": null },
            {
                "name": "Fred", "gender": "Male", "age": 40,
                "pets": [{ "name": "Tom", "type": "Cat" }, { "name": "Max", "type": "Cat" }, { "name": "Sam", "type": "Dog" }, { "name": "Jim", "type": "Cat" }]
            },
            {
                "name": "Samantha", "gender": "Female", "age": 40,
                "pets": [{ "name": "Tabby", "type": "Cat" }]
            },
            {
                "name": "Alice", "gender": "Female", "age": 64,
                "pets": [{ "name": "Simba", "type": "Cat" }, { "name": "Nemo", "type": "Fish" }]
            }]

    	//get all data from web service
        var url = "http://agl-developer-test.azurewebsites.net/people.json";

        $httpBackend.whenGET(url).respond(people);
          	
    	// Pass through any requests for views in app folder
        $httpBackend.whenGET(/views\/.*/).passThrough();
    }]);
})();
