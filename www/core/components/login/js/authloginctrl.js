angular.module('mm.auth')

.controller('mmAuthLoginCtrl', function($scope, $state, $timeout, mmAuth) {

    $scope.identities = mmAuth.getIdentities();
    $scope.data = {
        hasIdentities: mmAuth.hasIdentities(),
        showDetele: false
    }

    $scope.toggleDelete = function() {
        $scope.data.showDelete = !$scope.data.showDelete;
    };

    $scope.onItemDelete = function(e, index) {
        mmAuth.deleteIdentity(index);
        $scope.identities.splice(index, 1);
        console.log($scope.identities);

        $scope.data.hasIdentities = mmAuth.hasIdentities();
        if (!$scope.data.hasIdentities) {
            $scope.data.showDelete = false;
        }

        // Prevent login() from being triggered. No idea why I cannot replicate this
        // problem on http://codepen.io/ionic/pen/JsHjf.
        e.stopPropagation();
    }

    $scope.login = function() {
        mmAuth.login();
        $state.go('site.index');
    }

    $scope.add = function() {
        $state.go('login.site');
    }

});