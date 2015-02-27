angular.module('mm.auth')

.controller('mmAuthCredCtrl', function($scope, $state, $stateParams, $timeout, mmAuth, mmDialogs) {

    $scope.logindata = mmAuth.getLoginData();
    $scope.login = function() {
        mmDialogs.showModalLoading('Loading');

        var siteurl = $scope.logindata.siteurl,
            username = $scope.logindata.username,
            password = $scope.logindata.password;

        if (!username || !password) {
            return;
        }
        mmAuth.getUserToken(siteurl, username, password).then(function(token) {
            mmAuth.saveToken(siteurl, token).then(function() {
                mmDialogs.closeModalLoading();
                mmAuth.clearLoginData();
                $state.go('site.index');
            }, function(error) {
                alert(error);
            });
        }, function(error) {
            alert(error);
        });
    };

});
