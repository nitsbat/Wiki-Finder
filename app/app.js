'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngResource'
])

myApp.controller('MainController', ['$scope', '$sce', '$resource', '$http', function ($scope, $sce, $resource, $http) {
  var searchLink = "https://en.wikipedia.org/wiki/";
  this.search = "Search..";
  $scope.searchInput = "";
  this.searchEnabled = false;
  $scope.resultList = [];
  this.checkForMovement = false;

  this.searchWikipedia = function () {
    setSearchBarAtTheTop();
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + $scope.searchInput;
    this.resultSet = 1;
    url = $sce.trustAsResourceUrl(url);
    try {
      $http.jsonp(url, { jsonpCallbackParam: 'callback' })
        .then(function (result) {
          if (populateSearchList(result)) {
            $scope.resultList = populateSearchList(result);
            addSearchTermtoList(); // for searching in wikipedia api
            getBodyDescription(); // to get the description under the heading of div
            console.log($scope.resultList);
          } else {
            throw "The http response hasn't come"
          }

        });
    } catch (e) {
      alert("ERROR : " + e);
    }

  }

  function getBodyDescription() {
    $scope.resultList.forEach(element => {
      let parser = new DOMParser()
      let doc = parser.parseFromString(element.snippet, "text/html")
      element.bodyDescription = doc.body.innerText;
    });
  }

  function addSearchTermtoList() {
    $scope.resultList.forEach(element => {
      element.searchTerm = searchLink + (element.title).replace(/\s/g, "_");
    });
  }

  function setSearchBarAtTheTop() {
    document.getElementsByClassName("containertwo")[0].style.margin = "-200px 0px 0px -50px";
  }

  function populateSearchList(result) {
    return result.data.query.search;
  }

  this.setSearchStyle = function () {
    document.getElementsByClassName("random-article-div")[0].style.visibility = "hidden";
    document.getElementsByClassName("icon-search-div")[0].style.visibility = "hidden";
    if (!this.checkForMovement) {
      document.getElementById("input-box").style.margin = "0px 0px 0px -50px";
      this.checkForMovement = true;
    }
  }
}])