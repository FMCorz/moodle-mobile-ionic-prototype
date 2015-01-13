angular.module('mm.site', [])

.factory('mmSiteCourses', function() {

    var store = {},
        self = {};

    self.all = function() {
        if (!store.courses) {
            store.courses = [
              {
                id: 1,
                name: "Moodle in English",
                desc: "This course is the main place for support and developer discussions between users and developers in English. For discussions in other languages, please see the full list of all communities."
              },
              {
                id: 2,
                name: "Moodle Certification",
                desc: "The Moodle Course Creator Certificate (MCCC) allows you to demonstrate your knowledge and skills using Moodle, and is supported globally by the network of Moodle Partners."
              },
              {
                id: 3,
                name: "Moodle for Language Teaching",
                desc: "A community of teachers and developers specifically interested in using Moodle for teaching languages."
              },
            ]
        }
        return store.courses;
    }

    return self;

})

.factory('mmCourseParticipants', function($timeout) {

   var store = {},
        self = {};

    var validChars = "abcdefghijklmnopqrstuvwxyz";

    function getRandomString(length) {
        var text = "";

        for( var i = 0; i < length; i++ )
            text += validChars.charAt(Math.floor(Math.random() * validChars.length));
        text = text.charAt(0).toUpperCase() + text.slice(1);

        return text;
    }

    function getRandomParticipant(id) {
        var gender = Math.round(Math.random());
        var pictureNumber = Math.floor((Math.random() * 50) + 1);
        var avatar = 'https://randomuser.me/api/portraits/thumb/'+
                            (gender ? 'men' : 'women')+'/'+pictureNumber+'.jpg';

        return {
            id: id,
            name: getRandomString( Math.floor(Math.random() * 8) + 3 ),
            surname: getRandomString( Math.floor(Math.random() * 8) + 3 ),
            avatar: avatar
        };
    }

    function createRandomParticipants(total, currentCount) {
        var participants = [];
        for( var i = 0; i < total; i++ ) {
            participants.push( getRandomParticipant(currentCount + i) );
        }
        return participants;
    }

    self.getParticipants = function(courseid) {
        if (!store.participants) {
            store.participants = {};
        }
        if(!store.participants[courseid]) {
            store.participants[courseid] = createRandomParticipants(20, 0);
        }

        return store.participants[courseid];
    }

    self.loadMoreParticipants = function(courseid) {
        return $timeout( function(){
            var participants = createRandomParticipants(20, store.participants[courseid].length);
            store.participants[courseid] = store.participants[courseid].concat( participants );
            return store.participants[courseid];
        }, 400);
    }

    self.refreshParticipants = function(courseid){
        return $timeout( function(){
            var newParticipant = getRandomParticipant(store.participants[courseid].length);
            store.participants[courseid].unshift( newParticipant );
            return store.participants[courseid];
        }, 400);
    }

    return self;

})

.controller('mmSiteCourses', function($scope, mmSiteCourses) {
    $scope.courses = mmSiteCourses.all();
    $scope.filterText = '';
})

.controller('mmCourseParticipants', function($scope, $stateParams, mmCourseParticipants) {
    var courseid = $stateParams.courseid;
    $scope.participants = mmCourseParticipants.getParticipants(courseid);
    $scope.noMoreItemsAvailable = $scope.participants.length >= 119;

    $scope.loadMoreParticipants = function(){
        mmCourseParticipants.loadMoreParticipants(courseid).then(function(participants){
            $scope.participants = participants;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.noMoreItemsAvailable = $scope.participants.length >= 119;
        });
    };

    $scope.refreshParticipants = function(){
        mmCourseParticipants.refreshParticipants(courseid).then(function(participants){
            $scope.participants = participants;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
});
