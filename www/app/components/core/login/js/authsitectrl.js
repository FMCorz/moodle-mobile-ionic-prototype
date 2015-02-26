angular.module('mm.auth')

.controller('mmAuthSiteCtrl', function($scope, $ionicLoading, $state, mmAuth) {

    $scope.logindata = mmAuth.getLoginData();
    $scope.connect = function(url) {

        $ionicLoading.show({
            template: '<i class="icon ion-load-c"> Loading...'
        });

        mmAuth.checkSite(url).then(function() {
            $ionicLoading.hide();
            $state.go('login.credentials', {url: url});
        }, function(error) {
            // TODO: Show error message with ngMessages or popup
            $ionicLoading.hide();
            alert(error);
        });
    }

});