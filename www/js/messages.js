angular.module('mm.messages', [])

.factory('mmMessages', function() {

    var contacts = [];
    var discussions = [
        {
            messages: [],
            from: {
                name: 'Lily Alexander',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/76.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Thomas Henry',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/9.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Cody Franklin',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/16.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Brooklyn Johnson',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/39.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Katrina Baker',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/46.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Leonard Holmes',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Gertrude Reyes',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/87.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Carla Anderson',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/42.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Jon Hill',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/28.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Gene Gibson',
                thumb: 'https://randomuser.me/api/portraits/thumb/men/47.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Kenzi Davidson',
                thumb: 'https://randomuser.me/api/portraits/thumb/women/49.jpg',
            }
        },
        {
            messages: [],
            from: {
                name: 'Vickie Hicks',
                thumb: 'https://randomuser.me/api/portraits/med/women/35.jpg',
            }
        }
    ];

    messageBank = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Vivamus non magna rhoncus, elementum velit eget, molestie urna.',
        'Donec et purus et erat sodales eleifend non sed erat.',
        'Phasellus a tortor semper, volutpat nulla non, rutrum odio.',
        'Aenean ut orci efficitur, gravida diam ut, luctus ligula.',
        'Donec viverra ipsum eget est consectetur, a suscipit lorem rhoncus.',
        'Suspendisse et felis a quam pulvinar hendrerit.',
        'Curabitur accumsan velit sollicitudin, fermentum sapien vel, posuere lacus.',
        'Maecenas vestibulum velit vitae orci elementum, in ultrices nulla lobortis.',
        'Etiam fringilla orci ut tellus mollis sagittis.',
        'Duis vehicula lacus sed aliquam dapibus.',
        'Etiam vehicula ligula sed lorem commodo, et iaculis ipsum placerat.',
        'Nulla lobortis est sit amet ex cursus dapibus.',
        'Vestibulum sollicitudin dolor non nunc bibendum ultrices.',
        'Aliquam varius urna ut diam blandit ullamcorper sed nec sem.',
        'Fusce imperdiet lorem imperdiet tortor sodales pharetra.',
        'Fusce mollis orci commodo orci dignissim, nec gravida mi euismod.',
        'Aenean in nunc eu tellus scelerisque dapibus.',
        'Aliquam eleifend ante varius dolor congue rhoncus.',
        'Fusce condimentum ante quis tortor rhoncus fringilla.',
        'Curabitur vitae enim ut turpis bibendum finibus id at nibh.',
        'Morbi vitae tellus eget ligula suscipit convallis.',
        'Mauris in nunc sed mauris faucibus volutpat at vitae sapien.',
        'Praesent vitae velit a purus blandit mattis non aliquam neque.',
        'Phasellus sit amet dui a lorem tempus fermentum.',
        'Vivamus vitae ligula tempus, tincidunt enim at, cursus turpis.',
        'Praesent non eros convallis, egestas urna sed, iaculis velit.',
        'Ut vel augue eget odio egestas interdum.',
        'Nunc et orci feugiat, efficitur nibh at, luctus nulla.',
        'Fusce tristique tortor eu sodales consequat.',
        'Praesent ac arcu sed est feugiat consectetur a in urna.',
        'Proin eget odio et velit iaculis auctor eget ac ipsum.',
        'Praesent tempus elit in ante viverra, non maximus ex sodales.',
        'Donec pretium ipsum nec bibendum tincidunt.',
        'Fusce congue quam ac fringilla vulputate.',
        'Donec posuere dui et neque rutrum, iaculis semper nunc condimentum.',
        'Nam ac augue vel nisi porttitor rhoncus.',
        'Sed ut orci pretium, bibendum risus eget, consectetur orci.',
        'Duis consectetur libero et tellus aliquet, nec lacinia mi sollicitudin.',
        'Suspendisse tincidunt nibh sed interdum porta.',
        'Quisque eu tortor iaculis, hendrerit lectus eget, tristique nisi.',
        'Aenean imperdiet lacus eget elementum laoreet.',
        'Aliquam quis lorem ac dolor bibendum pellentesque ac id nisl.',
        'Nunc faucibus massa eu congue iaculis.',
        'Morbi sed neque in est euismod aliquam.',
        'Phasellus accumsan augue eget ornare varius.',
        'Ut ut quam feugiat, congue orci et, ultrices tellus.',
        'Donec a enim ac metus volutpat elementum.',
        'Nunc consectetur magna vel risus vulputate, eu eleifend erat tristique.',
        'Integer quis orci luctus, commodo nisl id, dapibus metus.',
        'Mauris in nunc rhoncus, consectetur quam faucibus, convallis augue.',
        'Nullam efficitur nibh viverra massa feugiat, at vehicula erat tincidunt.',
        'Nulla finibus augue vitae metus efficitur, in blandit neque condimentum.',
        'Nunc sit amet nulla iaculis, commodo nulla id, vehicula augue.',
        'Vestibulum ultrices diam non elit ornare, sed maximus ipsum bibendum.',
        'Suspendisse sed arcu commodo, blandit lectus vel, vulputate quam.',
        'Nullam imperdiet sem non malesuada rhoncus.',
        'Praesent eu dolor maximus, sodales risus ac, efficitur orci.',
        'Praesent porta diam et nibh condimentum aliquam.',
        'Integer quis lacus finibus, convallis sapien vel, sodales urna.',
        'Aliquam quis nibh pulvinar, hendrerit nibh sed, feugiat diam.',
        'Pellentesque elementum libero eu lorem tincidunt congue.',
        'Aenean ut arcu imperdiet, tincidunt augue eu, sodales sapien.',
        'Ut pulvinar nulla id ultricies pulvinar.',
        'Ut dapibus lorem nec commodo malesuada.',
        'Aenean pulvinar est et molestie rutrum.',
        'Suspendisse eu diam vehicula nibh auctor suscipit',
    ]

    function generateDiscussions() {
        var index = 0,
            count = 0,
            msgidx = 0,
            startDate = new Date();

        if (discussions[19]) {
            // A few discussions have already been generated.
            return;
        }

        for (var i = 0; i < 20; i++) {

            // Copy existing conversation here.
            if (!discussions[i]) {
                discussions[i] = discussions[index];
            }

            // Generate conversation.
            if (discussions[index].messages.length < 1) {
                count = Math.floor(Math.random() * 20) + 5;
                for (var j = 0; j < count; j++) {
                    msgidx = Math.floor(Math.random() * messageBank.length);
                    discussions[index].messages.push({
                        message: messageBank[msgidx],
                        mine: Math.round(Math.random()) > 0 ? true: false,
                        time: Math.round(startDate.getTime() / 1000 - Math.random() * 500000) * 1000
                    });
                };
            }

            index++;
            if (index >= discussions.length) {
                index = 0;
            }
        }
    }

    function addMessage(index, message) {
        discussions[index].messages.push({
            mine: true,
            time: new Date(),
            message: message
        });
    }

    function getContact(index) {
        generateDiscussions();
        return discussions[index].from;
    }

    function getContacts(index) {
        var tmp = {};
        if (contacts.length < 1) {
            generateDiscussions();
            angular.forEach(discussions, function(v, k) {
                if (tmp[v.from.name]) {
                    return;
                }
                tmp[v.from.name] = true;
                contacts[k] = v.from;
                contacts[k]['index'] = k;
            });
        }
        return contacts;
    }

    function getDiscussion(index) {
        generateDiscussions();
        return discussions[index];
    }

    function getDiscussions() {
        generateDiscussions();
        return discussions;
    }

    return {
        addMessage: addMessage,
        getContact: getContact,
        getContacts: getContacts,
        getDiscussion: getDiscussion,
        getDiscussions: getDiscussions
    };

})

.value('mmMessagesMessageTabConst', 0)
.value('mmMessagesContactTabConst', 1)

.controller('mmMessagesCtrl', function($scope, $state, $ionicPlatform, contacts, discussions) {
    var personIndex = null;

    $scope.contacts = contacts;
    $scope.discussions = discussions;

    $scope.showDiscussionLink = false;
    $scope.showInfoLink = false;

    $scope.goDiscussion = function() {
        $scope.showDiscussionLink = false;
        $scope.showInfoLink = true;
        $state.go('site.messages.tablet', {index: personIndex});
    };
    $scope.goInfo = function() {
        $scope.showDiscussionLink = true;
        $scope.showInfoLink = false;
        $state.go('site.messages.contacts-tablet', {index: personIndex});
    };

    // Implemented this way for faster DOM update.
    $scope.$watch(function() {
        return $state.is('site.messages.contacts-tablet');
    }, function(newv, oldv, $scope) {
        if (newv) {
            $scope.showDiscussionLink = true;
            $scope.showInfoLink = false;
        }
    });

    $scope.$watch(function() {
        return $state.is('site.messages.tablet');
    }, function(newv, oldv, $scope) {
        if (newv) {
            $scope.showDiscussionLink = false;
            $scope.showInfoLink = true;
        }
    });

    $scope.$on('mmMessagesContactSelected', function(e, index) {
        personIndex = contacts[index].index;
    });
    $scope.$on('mmMessagesDiscussionSelected', function(e, index) {
        personIndex = index;
    });
})

.controller('mmMessagesContactsCtrl', function($rootScope, $state, $scope, $ionicTabsDelegate, $ionicPlatform, mmMessagesContactTabConst) {
    $scope.currentIndex = null;
    $scope.$on('mmMessagesContactSelected', function(e, index) {
        $scope.currentIndex = index;
    });
    $scope.$on('mmMessagesDiscussionSelected', function(e, index) {
        if (mmMessagesContactTabConst != $ionicTabsDelegate.$getByHandle('messages-tabs').selectedIndex()) {
            $scope.currentIndex = null;
        }
    });

    $scope.getURL = function(index) {
        if ($ionicPlatform.isTablet()) {
            return $state.href('site.messages.contacts-tablet', {index: index});
        }
        return $state.href('site.messages-contact', {index: index});
    };
})

.controller('mmMessagesContactCtrl', function($rootScope, $scope, $state, $ionicPlatform, index, contact) {
    $scope.contact = contact;
    $scope.index = index;
    $scope.sendMessage = function() {
        if ($ionicPlatform.isTablet()) {
            $state.go('site.messages.tablet', {index: index});
        } else {
            $state.go('site.messages-discussion', {index: index});
        }
    };
    $rootScope.$broadcast('mmMessagesContactSelected', index);
})

.controller('mmMessagesDiscussionsCtrl', function($rootScope, $scope, $stateParams, $state, $ionicPlatform, $ionicTabsDelegate, mmMessagesMessageTabConst) {

    // We can create a service for return device information.
    $scope.isTablet = document.body.clientWidth > 600;
    $scope.currentIndex = null;

    $scope.$on('mmMessagesContactSelected', function(e, index) {
        if (mmMessagesMessageTabConst != $ionicTabsDelegate.$getByHandle('messages-tabs').selectedIndex()) {
            $scope.currentIndex = null;
        }
    });
    $scope.$on('mmMessagesDiscussionSelected', function(e, index) {
        $scope.currentIndex = index;
    });

    // $scope.$on('$ionicView.enter', function() {
    //     console.log('$ionicView.enter');

    //     if ($scope.isTablet) {
    //         // Load the first discussion.
    //         // This does not allways works, seems to be cached states.
    //         console.log("state go...");
    //         $state.go('site.messages.tablet', {index: 0});
    //     }

    // });

    // Function for returning the correct URL for the state.
    $scope.getURL = function(index) {
        if ($ionicPlatform.isTablet()) {
            return $state.href('site.messages.tablet', {index: index});
        }
        return $state.href('site.messages-discussion', {index: index});
    };
})

.controller('mmMessageDiscussionCtrl', function($rootScope, $scope, $stateParams, $ionicScrollDelegate, $timeout, mmMessages, discussion) {
    var sv,
        lastDate = null;

    $scope.index = $stateParams.index;

    // We can create a service for return device information.
    $scope.isTablet = document.body.clientWidth > 600;

    // Scroll to the botton.
    $timeout(function() {
        sv = $ionicScrollDelegate.$getByHandle('messagesScroll');
        sv.scrollBottom();
    });

    $scope.addMessage = function(message) {
        if (!message) {
            return;
        }
        mmMessages.addMessage($stateParams.index, message);
        sv.scrollBottom();
    };

    $scope.showDate = function(message) {
        var d = new Date(message.time);
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(1);

        if (!lastDate || d.getTime() != lastDate.getTime()) {
            lastDate = d;
            return true;
        }
    };

    $scope.discussion = discussion;
    $rootScope.$broadcast('mmMessagesDiscussionSelected', $stateParams.index);
});
