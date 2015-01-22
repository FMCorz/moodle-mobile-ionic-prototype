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

.controller('mmAppSettingsCtrl', function($scope, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(false);
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
