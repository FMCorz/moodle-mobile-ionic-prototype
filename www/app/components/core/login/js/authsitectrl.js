angular.module('mm.auth')

.controller('mmAuthSiteCtrl', function($scope, $ionicLoading, $state, $timeout, mmAuth) {
    $scope.connect = function(url) {
        if (!url) {
            return;
        }

        $ionicLoading.show({
            template: '<i class="icon ion-load-c"> Loading...'
        });
        $timeout(function() {
            $ionicLoading.hide();
            $state.go('login.credentials', {url: url});
        }, 1000);
    }

});