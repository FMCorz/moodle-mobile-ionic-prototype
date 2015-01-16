angular.module('mm.preferences', [])

.controller('mmSiteSections', function($scope, $state) {
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.getURL = function(type) {
        if ($scope.isTablet) {
            return "#/site/sections/" + type;
        } else {
            return "#/site/section-" + type;
        }
    };

    $scope.$on('$ionicView.enter', function() {
        console.log('$ionicView.enter');

        if ($scope.isTablet) {
            // Load the first discussion.
            // This does not allways works, seems to be cached states.
            console.log("state go...");
            $state.go("site.sections.all");
        }

    });
});
