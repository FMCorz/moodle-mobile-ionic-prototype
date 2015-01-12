angular.module('mm.preferences', [])

.factory('mmPreferences', function($translate) {

    var langs = {
        "en": "English",
        "ca": "Català",
        "fr": "Français"
    };

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

    return self;

})

.controller('mmPreferencesCtrl', function($scope, mmPreferences) {
    $scope.langs = mmPreferences.getLanguages();
    $scope.selectedLanguage = mmPreferences.getCurrentLanguage();
    $scope.languageChanged = mmPreferences.languageChanged;
});
