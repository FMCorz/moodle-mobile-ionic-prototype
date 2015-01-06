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
        hasIdentities: hasIdentities,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getIdentities: getIdentities
    }

})

.controller('mmAuthLoginCtrl', function($scope, $state, $timeout, mmAuth) {

    $scope.identities = mmAuth.getIdentities();

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

