angular.module('mm.auth')

.controller('mmAuthCredCtrl', function($scope, $state, $stateParams, $timeout, mmAuth, mmDialogs) {

    $scope.logindata = mmAuth.getLoginData();
    $scope.login = function() {

        var siteurl = $scope.logindata.siteurl,
            username = $scope.logindata.username,
            password = $scope.logindata.password;

        if (!username) {
            alert('usernamerequired');
            return;
        }
        if(!password) {
            alert('passwordrequired');
            return;
        }

        mmDialogs.showModalLoading('Loading');

        mmAuth.getUserToken(siteurl, username, password).then(function(token) {
            mmAuth.saveToken(siteurl, token).then(function() {
                mmDialogs.closeModalLoading();
                mmAuth.clearLoginData();
                $state.go('site.index');
            }, function(error) {
                alert(error);
            });
        }, function(error) {
            mmDialogs.closeModalLoading();
            alert(error);
        });
    };

});
