angular.module('mm.sections', [])

.controller('mmSiteSections', function($scope, $state) {
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.getURL = function(type) {
        if ($scope.isTablet) {
            return $state.href('site.sections.' + type);
        } else {
            return $state.href('site.section-' + type);
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
})
.controller('mmSiteSection', function($scope, $state, $timeout) {
    var forget, forget2;
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.downloadicon = true;
    $scope.loadingicon = false;
    $scope.loadingicon2 = false;
    $scope.refreshicon2 = true;

    $scope.download = function(e) {
        $scope.downloadicon = false;
        $scope.loadingicon = true;
        e.preventDefault();
        e.stopPropagation();
        forget = $timeout(function() {
            $scope.downloadicon = false;
            $scope.loadingicon = false;
        }, 2000);
    };

    $scope.cancel = function(e) {
        $scope.downloadicon = true;
        $scope.loadingicon = false;
        $timeout.cancel(forget);
        e.preventDefault();
        e.stopPropagation();
    };

    $scope.cancel2 = function(e) {
        $scope.loadingicon2 = false;
        $scope.refreshicon2 = true;
        $timeout.cancel(forget2);
        e.preventDefault();
        e.stopPropagation();
    };

    $scope.refresh2 = function(e) {
        $scope.loadingicon2 = true;
        $scope.refreshicon2 = false;
        forget2 = $timeout(function() {
            $scope.loadingicon2 = false;
            $scope.refreshicon2 = false;
        }, 2000);
        e.preventDefault();
        e.stopPropagation();
    };

    $scope.go = function(e) {
        window.open('https://moodle.org', '_blank');
        e.preventDefault();
        e.stopPropagation();
    };

    $scope.goToFile = function(e) {
        window.open('files/lorem.pdf', '_blank');
        e.preventDefault();
        e.stopPropagation();
    }
})
;
