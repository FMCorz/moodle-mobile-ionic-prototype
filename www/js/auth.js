angular.module('mm.auth', [])

.factory('mmAuth', function() {

    var store = window.sessionStorage;

    function isLoggedIn() {
        return store.isLoggedIn && parseInt(store.isLoggedIn, 10) === 1;
    }

    function login() {
        store.isLoggedIn = '1';
    }

    function logout() {
        store.isLoggedIn = '0';
    }

    function addIdentity(data) {
        var identities = getIdentities();
        identities.push(data);
        store.identities = JSON.stringify(identities);
    }

    function deleteIdentity(index) {
        var identities = getIdentities();
        identities.splice(index, 1);
        store.identities = JSON.stringify(identities);
    }

    function hasIdentities() {
        var identities = getIdentities();
        return identities.length > 0;
    }

    function getIdentities() {
        var identities = store.identities;
        if (!identities) {
            return [];
        }
        return JSON.parse(identities);
    }

    return {
        addIdentity: addIdentity,
        deleteIdentity: deleteIdentity,
        hasIdentities: hasIdentities,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getIdentities: getIdentities
    }

})

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

})

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

})


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

})

;

