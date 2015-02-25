angular.module('mm.auth')

.controller('mmAuthCredCtrl', function($scope, $state, $ionicLoading, $stateParams, $timeout, mmAuth) {

    $scope.url = $stateParams.url;
    $scope.credentials = {}
    $scope.login = function() {
        $ionicLoading.show({
            template: '<i class="icon ion-load-c"> Loading...'
        });
        $timeout(function() {
            $ionicLoading.hide();
            if (!$scope.credentials.username || !$scope.credentials.password) {
                return;
            }
            mmAuth.addIdentity({
                thumb: 'http://api.randomuser.me/portraits/thumb/women/' + Math.round((Math.random() * 99) + 1) + '.jpg',
                name: $scope.credentials.username,
                desc: $scope.url
            })
            mmAuth.login();
            $state.go('site.index');
        }, 1000);
    }

});
