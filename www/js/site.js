angular.module('mm.site', [])

.factory('mmSiteCourses', function() {

    var store = {},
        self = {};

    self.all = function() {
        if (!store.courses) {
            store.courses = [
              {
                name: "Moodle in English",
                desc: "This course is the main place for support and developer discussions between users and developers in English. For discussions in other languages, please see the full list of all communities."
              },
              {
                name: "Moodle Certification",
                desc: "The Moodle Course Creator Certificate (MCCC) allows you to demonstrate your knowledge and skills using Moodle, and is supported globally by the network of Moodle Partners."
              },
              {
                name: "Moodle for Language Teaching",
                desc: "A community of teachers and developers specifically interested in using Moodle for teaching languages."
              },
            ]
        }
        return store.courses;
    }

    return self;

})

.controller('mmSiteCourses', function($scope, mmSiteCourses) {
    $scope.courses = mmSiteCourses.all();
    $scope.filterText = '';
});
