angular.module('mm.sections', [])

.factory('mmSiteSections', function() {

    var self = {},
        store = {
            sections: [
              {
                id: 1,
                name: "Welcome",
                resources: [
                    {
                        name: "Course announcements",
                        img: "img/mod/forum.png",
                        icon: "",
                        state: "site.forum"
                    }, 
                    {
                        name: "Course outline",
                        img: "img/files/pdf-24.png",
                        icon: "",
                        state: "site.sections-all"
                    }
                ]
              },
              {
                id: 2,
                name: "Have your say",
                resources: [
                    {
                        name: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
                        img: "",
                        icon: "",
                        state: "site.label"
                    }, 
                    {
                        name: "See the summit of Mont Blanc",
                        img: "img/mod/page.png",
                        icon: "ion-ios7-cloud-download-outline",
                        state: "site.sections-all"
                    }, 
                    {
                        name: "Vote for the climb",
                        img: "img/mod/choice.png",
                        icon: "ion-ios7-browsers-outline",
                        state: "site.sections-all"
                    }
                ]
              }, 
              {
                id: 3,
                name: "Learning resources",
                resources: [
                    {
                        name: "Course resources",
                        img: "img/mod/folder.png",
                        icon: "",
                        state: "site.folder"
                    }
                ]
              }
            ]
        };

    self.getSections = function() {
        return store.sections.map( function(section) {
            return {id: section.id, name: section.name};
        });
    }

    self.getSectionsAndResources = function() {
        return store.sections;
    }

    self.getSectionResources = function(sectionid) {
        for(var i = 0; i < store.sections.length; i++) {
            var section = store.sections[i];
            if( section.id == sectionid) {
                return section.resources;
            }
        }
        return [];
    }

    self.getSectionName = function(sectionid) {
        for(var i = 0; i < store.sections.length; i++) {
            var section = store.sections[i];
            if( section.id == sectionid) {
                return section.name;
            }
        }
        return '';
    }

    return self;

})

.controller('mmSiteSections', function($scope, $state, mmSiteSections) {
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.getURL = function(type, id) {
        if ($scope.isTablet) {
            return $state.href('site.sections.' + type, {id: id} );
        } else {
            return $state.href('site.section-' + type, {id: id} );
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

    $scope.sections = mmSiteSections.getSections();

})
.controller('mmSiteSectionAll', function($scope, mmSiteSections) {
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.sections = mmSiteSections.getSectionsAndResources();
    $scope.filterText = '';

    $scope.filterResources = function( filterText ) {
        return function( item ) {
            var found = false;
            for(var i = 0; i < item.resources.length && !found; i++) {
                found = item.resources[i].name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
            }
            return found;
        };
    };
})
.controller('mmSiteSectionOne', function($scope, $stateParams, mmSiteSections) {
    $scope.isTablet = document.body.clientWidth > 600;
    var sectionid = $stateParams.id;
    $scope.resources = mmSiteSections.getSectionResources(sectionid);
    $scope.name = mmSiteSections.getSectionName(sectionid);
    $scope.filterText = '';
})
;
