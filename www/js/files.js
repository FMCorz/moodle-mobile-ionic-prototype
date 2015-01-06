angular.module('mm.files', [])

.factory('mmFilesMy', function() {

    var store = {},
        self = {};

    self.add = function(path, data) {
        if (path) {
            store.files['children'][path]['children'].push(data);
        } else {
            store.files['children'].push(data);
        }
    }

    self.getFiles = function(path) {
        if (!store.files) {
            store.files = {
                name: 'My private files',
                children: [
                    {
                        name: 'Course material',
                        children: [
                            {name: 'Learning English.pdf'},
                            {name: 'Peer reviewing.pdf'},
                            {name: 'World map.pdf'},
                        ]
                    },
                    {
                        name: 'Exams',
                        children: [
                            {name: 'Math 101 - 2014.doc'},
                            {name: 'Science 202 - 2013.doc'}
                        ]},
                    {name: 'Beer brewing.pdf'},
                    {name: 'Work expenses.xls'}
                ]
            }
        }

        if (path) {
            return store.files['children'][path];
        }
        return store.files;
    }

    return self;

})

.factory('mmFilesSite', function() {

    var store = {},
        self = {};

    self.getFiles = function(path) {
        if (!store.files) {
            store.files = {
                name: 'Site files',
                children: [
                    {
                        name: 'Moodle in English',
                        children: [
                            {name: 'How to use Moodle.pdf'},
                            {name: 'Top 10 tips about Moodle.pdf'},
                            {name: 'Veni vedi vici.odt'},
                        ]
                    },
                    {
                        name: 'Moodle Certification',
                        children: [
                            {name: 'Certificate template.doc'},
                            {name: 'Terms and conditions.pdf'}
                        ]
                    },
                    {
                        name: 'Moodle for Language Teaching',
                        children: [
                            {name: 'Best practices.pdf'},
                            {name: 'Everyone.jpg'},
                            {name: 'Tedx talk.mp4'},
                        ]
                    },
                ]
            }
        }

        if (path) {
            return store.files['children'][path];
        }
        return store.files;
    }

    return self;

})

.controller('mmFilesMyCtrl', function($scope, $stateParams, $ionicActionSheet, mmFilesMy) {
    var path = $stateParams.path,
        files = mmFilesMy.getFiles(path);

    $scope.files = files.children;
    $scope.title = files.name;

    $scope.add = function() {
        $ionicActionSheet.show({
            buttons: [
                { text: 'Photo albums' },
                { text: 'Camera' },
                { text: 'Audio' },
                { text: 'Video' },
            ],
            titleText: 'Upload a file from',
            cancelText: 'Cancel',
            buttonClicked: function(index) {
                var choices = ['album', 'camera', 'audio', 'video'],
                    ext = ['.png', '.jpg', '.mp3', '.mp4'],
                    name = choices[index] + Math.round(Math.random() * 99 + 1) + ext[index],
                    files;
                
                mmFilesMy.add(path, {name: name});
                files = mmFilesMy.getFiles(path);
                $scope.files = files.children;

                return true;
            }
        })
    }

})

.controller('mmFilesSiteCtrl', function($scope, $stateParams, mmFilesSite) {
    var path = $stateParams.path,
        files = mmFilesSite.getFiles(path);

    $scope.files = files.children;
    $scope.title = files.name;

});
