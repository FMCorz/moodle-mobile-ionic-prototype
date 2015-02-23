angular.module('mm.events', [])

.factory('mmEventsPlugin', function() {
    var self = {};

    self.getIcon = function() {
        return 'ion-calendar';
    };

    self.isPluginVisible = function() {
        return true;
    };

    self.getPluginName = function() {
        return 'Calendar events';
    };

    self.getExtraNumber = function() {
        return 0;
    };

    self.getMainState = function() {
        return 'site.events';
    };

    return self;
})

.factory('mmSiteEvents', function() {

    var store = {},
        self = {};

    self.getAllEvents = function() {
        if (!store.events) {
            store.events = [
              {
                id: 1,
                icon: "ion-ionic",
                name: "Mountain MoodleMooth",
                start: "8/1/2015 9:00am",
                end: "10/1/2015 5:30pm"
              },
              {
                id: 2,
                icon: "ion-calendar",
                name: "Moodle 2.8 Scheduled Release",
                start: "11/1/2015 10:00am",
                end: "11/1/2015 12:00am"
              },
              {
                id: 3,
                icon: "ion-person-stalker",
                name: "MoodleMoot Colombia",
                start: "19/1/2015 7:00am",
                end: "20/1/2015 2:30pm"
              },
              {
                id: 4,
                icon: "ion-person",
                name: "MoodleMoot Romania",
                start: "1/2/2015 10:00am",
                end: "3/2/2015 6:00pm"
              },
            ]
        }
        return store.events;
    };

    self.getEvent = function(index) {
        return self.getAllEvents()[index] || undefined;
    };

    return self;

})

.controller('mmSiteEventsCtrl', function($scope, $state, events) {
    $scope.isTablet = document.body.clientWidth > 600;

    $scope.getURL = function(index) {
        if ($scope.isTablet) {
            return $state.href('site.events.tablet', {index: index});
        } else {
            return $state.href('site.event', {index: index});
        }
    };

    $scope.$on('$ionicView.enter', function() {
        console.log('$ionicView.enter');

        if ($scope.isTablet) {
            // Load the first discussion.
            // This does not allways works, seems to be cached states.
            console.log("state go...");
            $state.go("site.events.tablet", {index: 0});
        }

    });

    $scope.events = events;
})
.controller('mmSiteEventCtrl', function($scope, event) {
    $scope.event = event;
})
;
