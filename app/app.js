'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [])

myApp.controller('MainController', ['$scope', function ($scope) {
  this.search = "Search..";
}])
