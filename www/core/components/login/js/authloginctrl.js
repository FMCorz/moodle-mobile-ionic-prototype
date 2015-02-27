angular.module('mm.auth')

.controller('mmAuthLoginCtrl', function($scope, $state, $ionicHistory, mmAuth, mmDialogs) {

    $scope.sites = mmAuth.getSites();
    $scope.data = {
        hasSites: mmAuth.hasSites(),
        showDetele: false
    }

    $scope.toggleDelete = function() {
        $scope.data.showDelete = !$scope.data.showDelete;
    };

    $scope.onItemDelete = function(e, index) {
        // Prevent login() from being triggered. No idea why I cannot replicate this
        // problem on http://codepen.io/ionic/pen/JsHjf.
        e.stopPropagation();

        var site = mmAuth.getSite(index);
        mmDialogs.popConfirm(undefined, 'Are you sure you want to delete the site "'+site.sitename+'"?')
            .then(function(confirmed) {
                if(confirmed) {
                    mmAuth.deleteSite(index);
                    $scope.sites.splice(index, 1);

                    if(!mmAuth.hasSites()) {
                        $state.go('login.site');
                    }
                }
            });

    }

    $scope.login = function(index) {
        console.log(index);
        mmAuth.loginInSite(index);
        $state.go('site.index');
    }

    $scope.add = function() {
        $state.go('login.site');
    }

});