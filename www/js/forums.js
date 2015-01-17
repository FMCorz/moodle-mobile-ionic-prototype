angular.module('mm.forums', [])

.controller('mmDiscussions', function($scope, $state) {
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.getURL = function() {
        if ($scope.isTablet) {
            return "#/site/forum/discussion" ;
        } else {
            return "#/site/discussion";
        }
    };

    $scope.$on('$ionicView.enter', function() {
        console.log('$ionicView.enter');

        if ($scope.isTablet) {
            // Load the first discussion.
            // This does not allways works, seems to be cached states.
            console.log("state go...");
            $state.go("site.forum.discussion");
        }

    });
})
.controller('mmDiscussionPosts', function($scope, $state) {
    $scope.isTablet = document.body.clientWidth > 600;
})
;
