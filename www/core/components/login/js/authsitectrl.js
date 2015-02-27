angular.module('mm.auth')

.controller('mmAuthSiteCtrl', function($scope, $state, mmAuth, mmDialogs) {

    $scope.logindata = mmAuth.getLoginData();

    $scope.connect = function(url) {

        if (!url) {
            alert('siteurlrequired');
            return;
        }

        mmDialogs.showModalLoading('Loading');

        if(mmAuth.isDemoSite(url)) {

            var sitedata = mmAuth.getDemoSiteData(url);

             mmAuth.getUserToken(sitedata.url, sitedata.username, sitedata.password).then(function(token) {
                mmAuth.saveToken(sitedata.url, token).then(function() {
                    mmDialogs.closeModalLoading();
                    mmAuth.clearLoginData();
                    $state.go('site.index');
                }, function(error) {
                    alert(error);
                });
            }, function(error) {
                alert(error);
            });
        }
        else {
            mmAuth.checkSite(url).then(function(code) {
                mmDialogs.closeModalLoading();
                $state.go('login.credentials');
            }, function(error) {
                // TODO: Show error message with ngMessages or popup
                mmDialogs.closeModalLoading();
                alert(error);
            });

        }
    }

});