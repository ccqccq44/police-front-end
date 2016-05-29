'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngNotify',
  'ngCookies',
  'myApp.login',
  'myApp.portal',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);




//.run(function(paginationConfig){
//  paginationConfig.previousText = '上一页';
//  paginationConfig.nextText = '下一页';
//  paginationConfig.boundaryLinks = true;
//  paginationConfig.firstText = '首页';
//  paginationConfig.lastText = '末页';
//  paginationConfig.maxSize = 5;
//  paginationConfig.rotate = false;
//  paginationConfig.itemsPerPage = 10;
//});







//
//
//app.controller('MyController', function($scope) {
//  var updateClock = function() {
//    $scope.clock = new Date();
//  };
//  var timer = setInterval(function() {
//    $scope.$apply(updateClock);
//  }, 1000);
//  updateClock();
//});