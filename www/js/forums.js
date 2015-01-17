angular.module('mm.forums', [])

.controller('mmDiscussions', function($scope, $state, $ionicPopover) {
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

    $scope.popover =  $ionicPopover.fromTemplate('<ion-popover-view><ion-header-bar> <h1 class="title">Menu</h1> </ion-header-bar> <ion-content> Home <br> Course home <br> Course sections... </ion-content></ion-popover-view>',
        {
        scope: $scope,
      });
})
.controller('mmDiscussionPosts', function($scope, $state) {
    $scope.isTablet = document.body.clientWidth > 600;
})
;
