angular.module('mm.auth')

.controller('mmAuthCredCtrl', function($scope, $state, $ionicLoading, $stateParams, $timeout, mmAuth) {

    $scope.logindata = mmAuth.getLoginData();
    $scope.login = function() {
        $ionicLoading.show({
            template: '<i class="icon ion-load-c"> Loading...'
        });
        $timeout(function() {
            $ionicLoading.hide();
            var siteurl = $scope.logindata.siteurl,
                username = $scope.logindata.username,
                password = $scope.logindata.password;

            if (!username || !password) {
                return;
            }
            mmAuth.getUserToken(siteurl, username, password).then(function(token) {
                console.log(token);
                mmAuth.saveToken(siteurl, token).then(function() {

                    mmAuth.addIdentity({
                        thumb: 'http://api.randomuser.me/portraits/thumb/women/' + Math.round((Math.random() * 99) + 1) + '.jpg',
                        name: $scope.logindata.username,
                        desc: $scope.url
                    })
                    mmAuth.login();
                    $state.go('site.index');
                }, function(error) {
                    alert(error);
                });
            }, function(error) {
                alert(error);
            });
            // mmAuth.addIdentity({
            //     thumb: 'http://api.randomuser.me/portraits/thumb/women/' + Math.round((Math.random() * 99) + 1) + '.jpg',
            //     name: $scope.logindata.username,
            //     desc: $scope.url
            // })
            // mmAuth.login();
            // $state.go('site.index');
        }, 1000);
    }

});
