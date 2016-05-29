'use strict';

angular.module('myApp.login', ['ngRoute','ngNotify','ngCookies'])
//,'ngCookies'      ['$cookieStore',
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl',function($scope, $http, ngNotify,$cookies) {

        $scope.loginSubmit = function (){
        $http({
           //url: 'http://10.122.202.159:8080/antifraud/login',
           url: 'http://127.0.0.1:8080/police/login',
           // url: 'http://121.42.157.22:8080/antifraud/login',
            dataType: 'json',
            method: 'POST',
            data: {username: $scope.username,password: $scope.userpassword},
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function(response){
            //console.log(response);
            if(response[0]=="success"){
               // console.log(response[1]);
               // console.log(response[2]);
                $cookies.put('sessionid',response[1]);
                $cookies.put( 'username',response[2]);
                //console.log($cookies.get('sessionid'));
               ngNotify.set("登录成功", "success");
               window.location.href="/police/app/index.html#/portal";
           }else{
               ngNotify.set("用户名或密码错误", "error");
               console.log(response);
           }
        }).error(function(error){
            $scope.error = error;
            ngNotify.set("连接超时，请稍后再试！", "error");
        });
        };
    });


