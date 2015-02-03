angular.module('mm.appsettings', [])

.factory('mmAppSettings', function($translate) {

    var langs = {
        "en": "English",
        "ca": "Català",
        "fr": "Français"
    };

    var sites = [
        {
            name: 'Mount Orange School',
            username: 'Barbara Gardner',
            showDelete: true,
            spaceusage: '20 MB'
        },
        {
            name: 'My Awesome Moodle',
            username: 'John Smith',
            showDelete: false,
            spaceusage: 'n/a'
        }
    ];

    var store = window.sessionStorage;

    self.getLanguages = function(){
        return langs;
    }

    self.getCurrentLanguage = function() {
        return store.lang || 'en';
    }

    self.languageChanged = function(selectedLanguage) {
        store.lang = selectedLanguage;
        $translate.use(selectedLanguage);
    }

    self.getSites = function(){
        return sites;
    }

    return self;

})

.controller('mmAppSettingsCtrl', function($scope, $ionicPlatform, $state) {
    $scope.isTablet = document.body.clientWidth > 600;

    $scope.getURL = function(page) {
        if ($ionicPlatform.isTablet()) {
            // console.log('site.settings-'+page+'.tablet');
            return $state.href('site.settings.'+page);
        } else {
            // console.log('site.settings-'+page);
            return $state.href('site.settings-'+page);
        }
    };

    $scope.$on('$ionicView.enter', function() {

        if ($scope.isTablet) {
            // Load the first discussion.
            // This does not allways works, seems to be cached states.
            console.log("state go...");
            $state.go("site.settings.general");
        }

    });
})

.controller('mmAppGeneralSettingsCtrl', function($scope, mmAppSettings) {
    $scope.langs = mmAppSettings.getLanguages();
    $scope.selectedLanguage = mmAppSettings.getCurrentLanguage();
    $scope.languageChanged = mmAppSettings.languageChanged;
})

.controller('mmAppSpaceUsageSettingsCtrl', function($scope, mmAppSettings) {
    $scope.sites = mmAppSettings.getSites();
    $scope.totalusage = '20 MB';
    $scope.freespace = '2 GB';
})

.controller('mmAppDevelopmentSettingsCtrl', function($scope) {
    $scope.cacheExpTime = 300000;
});
