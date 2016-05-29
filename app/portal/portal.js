'use strict';
angular.module('myApp.portal', ['ngRoute','ngNotify','ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/portal', {
            templateUrl: 'portal/portal.html',
            controller: 'PortalCtrl'
        });
    }])

    .controller('PortalCtrl', function($scope, $http, ngNotify, $interval,$cookies) {
        //$scope.respList=[];
        $scope.portalList = [];
        $scope.dealList = [];
        $scope.queryList = [];
        var i;
        var promise;

        var base="http://127.0.0.1:8080/police";
        //var base = "http://10.122.202.159:8080/police";

        $scope.getList = function () {
            $http({
                url: base + '/selectExpatriatelist',
                dataType: 'json',
                method: 'POST',
                data: {sessionid: $cookies.get('sessionid'), username: $cookies.get('username')},
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .success(function (response) {
                    console.log(response[0].code);
                    console.log(response[0].expatriateData);
                    if (response[0].code == "0") {
                        $scope.portalList = response[0].expatriateData;
                        //        $scope.respList=response[0].data;
                        //      for(i=0;i<$scope.respList.length;i++){
                        //          $scope.portalList.push( $scope.respList[i]);
                        //      }

                    } else {
                        window.location.href = "police/app/index.html#/login";
                    }
                })
                .error(function (error) {
                    $scope.error = error;
                });
        };
        $scope.getList();

        //点击提交按钮后到已处理的页面
        $scope.policeDeal = function (item) {
            //console.log("item here", item.callbackSituation);
            //!!将其转为布尔值
            if (!!item.policeCallback == false || item.policeCallback == "") {
                ngNotify.set("请选择回访情况", "error");
                return;
            }
            ngNotify.set("处理成功", "success");

            $scope.clock = {
                now: new Date().toLocaleString()
            };

            item.policeRecordTime = $scope.clock.now;
            $scope.dealList.push(item);
            $scope.insertDeallist = function () {
                $http({
                    url: base + '/insertPolicelist',
                    dataType: 'json',
                    method: 'POST',
                    data: {policelist: $scope.dealList[$scope.dealList.length - 1], username: $cookies.get('username')},
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    }
                })
            };

            $scope.insertDeallist();
            var idx = $scope.portalList.indexOf(item);
            if (idx > -1) {
                $scope.portalList.splice(idx, 1);
            }
        };

        //公安界面显示时间
        $scope.clock = {
            now: new Date().toLocaleString()
        };
        var updateClock = function () {
            $scope.clock.now = new Date().toLocaleString();
        };
        $interval(function () {
            updateClock()
        }, 1000);

        //显示登录用户的名字
        $scope.usernamelocal = $cookies.get('username');

        //查询页面点击查询按钮
        $scope.select = function () {
            var selectPhone = document.getElementById("selectPhone").value;
            if (selectPhone == "") {
                ngNotify.set("请输入要查询的电话号码", "error");
                return false;
            }
            $http({
                url: base + '/selectPolicelist',
                dataType: 'json',
                method: 'POST',
                data: {selectPhone: selectPhone},
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .success(function (response) {
                    console.log(response);
                    $scope.queryList = response;
                })
                .error(function (error) {
                    $scope.error = error;
                    ngNotify.set("查询失败", "error");
                });
        };


        //$scope.portalList = [
        //    {
        //        "crmTele": "15201327442",
        //        "vicTele": "18596662380",
        //        "contentType": "冒充领导诈骗",
        //        "showTime": "20160404",
        //        "callFrequency": "2",
        //        "callbackSituation":"回访成功",
        //        "fraudSituation":"无法确定",
        //        "fraudMoney":"100块",
        //        "recordTime":"20160523",
        //        "callbackDescription":"用户被骗了，需要报警"
        //    },
        //    {
        //        "crmTele": "15201327442",
        //        "vicTele": "18596662380",
        //        "contentType": "冒充领导诈骗",
        //        "showTime": "20160404",
        //        "callFrequency": "2",
        //        "callbackSituation":"回访成功",
        //        "fraudSituation":"无法确定",
        //        "fraudMoney":"100块",
        //        "recordTime":"20160523",
        //        "callbackDescription":"用户被骗了，需要报警"
        //    }
        //];

        var flag = false;
        $scope.blink = function () {
            if ($scope.portalList.length > 0) {
                if (flag===false) {
                    PageTitleNotification.On("您有新的工单需处理");
                    flag = true;
                }
            } else {
                PageTitleNotification.Off();
                flag = false;
            }
        };
       $interval(function () { $scope.blink()}, 500);


        function init(){
            promise = $interval(function(){$scope.getList()}, 300000);
        }
        init();

    });


