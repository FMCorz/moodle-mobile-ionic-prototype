angular.module('mm', [
  'ionic',
  'mm.auth',
  'mm.site',
  'mm.files',
  'mm.messages',
  'mm.preferences',
  'pascalprecht.translate'])

.run(function($ionicPlatform, $rootScope, $state, mmAuth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    if (toState.name.substr(0, 5) !== 'login' && !mmAuth.isLoggedIn()) {
      // We are not logged in.
      event.preventDefault();
      console.log('Redirect to login page, request was: ' + toState.name);
      $state.transitionTo('login.index');
    } else if (toState.name.substr(0, 5) === 'login' && mmAuth.isLoggedIn()) {
      // We are logged in and requested the login page.
      event.preventDefault();
      console.log('Redirect to course page, request was: ' + toState.name);
      $state.transitionTo('site.index');
    }

  });


})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('site', {
      url: '/site',
      templateUrl: 'tpl/site.html',
      abstract: true,
      onEnter: function($ionicHistory) {
        // Remove the login page from the history stack.
        $ionicHistory.clearHistory();
      }
    })

    .state('site.index', {
      url: '/index',
      views: {
        'site': {
          templateUrl: 'tpl/site-courses.html',
          controller: 'mmSiteCourses'
        }
      }
    })

    .state('site.notifications', {
      url: '/notifications',
      views: {
        'site': {
          templateUrl: 'tpl/site-notifications.html'
        }
      }
    })

    .state('site.sections', {
      url: '/sections',
      views: {
        'site': {
          templateUrl: 'tpl/site-sections.html'
        }
      }
    })

    .state('site.section-all', {
      url: '/section-all',
      views: {
        'site': {
          templateUrl: 'tpl/site-section-all.html'
        }
      }
    })

    .state('site.section', {
      url: '/section',
      views: {
        'site': {
          templateUrl: 'tpl/site-section.html'
        }
      }
    })

    .state('site.forum', {
      url: '/forum',
      views: {
        'site': {
          templateUrl: 'tpl/site-forum.html'
        }
      }
    })

    .state('site.discussion', {
      url: '/discussion',
      views: {
        'site': {
          templateUrl: 'tpl/site-discussion.html'
        }
      }
    })

    .state('site.messages', {
      url: '/messages',
      abstract: true,
      views: {
        'site': {
          // controller: 'mmDiscussionsCtrl',
          templateUrl: 'tpl/site-messages.html',
          // resolve: {
          //   discussions: function(mmMessages) {
          //     return mmMessages.getDiscussions();
          //   }
          // }
        },
      }
    })

    .state('site.messages.index', {
      url: '/index',
      views: {
        'left': {
          controller: 'mmDiscussionsCtrl',
          templateUrl: 'tpl/site-messages-discussions.html',
          resolve: {
            discussions: function(mmMessages) {
              return mmMessages.getDiscussions();
            }
          }
        },
        'main': {
          controller: 'mmDiscussionCtrl',
          templateUrl: 'tpl/site-messages-discussion.html',
          resolve: {
            discussion: function($stateParams, mmMessages) {
              return mmMessages.getDiscussion($stateParams.index || 0);
            }
          }
        }
      }
    })

    .state('site.messages.discussion', {
      url: '/discussion/:index',
      views: {
        'left': {
          controller: 'mmDiscussionsCtrl',
          templateUrl: 'tpl/site-messages-discussions.html',
          resolve: {
            discussions: function(mmMessages) {
              return mmMessages.getDiscussions();
            }
          }
        },
        'main': {
          controller: 'mmDiscussionCtrl',
          templateUrl: 'tpl/site-messages-discussion.html',
          resolve: {
            discussion: function($stateParams, mmMessages) {
              return mmMessages.getDiscussion($stateParams.index);
            }
          }
        }
      }
    })

    .state('site.events', {
      url: '/events',
      views: {
        'site': {
          templateUrl: 'tpl/site-events.html'
        }
      }
    })

    .state('site.event', {
      url: '/event',
      views: {
        'site': {
          templateUrl: 'tpl/site-event.html'
        }
      }
    })

    .state('site.files', {
      url: '/files',
      views: {
        'site': {
          templateUrl: 'tpl/site-files.html'
        }
      }
    })

    .state('site.files-my', {
      url: '/my?path',
      views: {
        'site': {
          controller: 'mmFilesMyCtrl',
          templateUrl: 'tpl/site-files-my.html'
        }
      }
    })

    .state('site.files-site', {
      url: '/site?path',
      views: {
        'site': {
          controller: 'mmFilesSiteCtrl',
          templateUrl: 'tpl/site-files-site.html'
        }
      }
    })

    .state('site.preferences', {
      url: '/preferences',
      views: {
        'site': {
          controller: 'mmPreferencesCtrl',
          templateUrl: 'tpl/site-preferences.html'
        }
      }
    })

    .state('site.settings', {
      url: '/settings',
      views: {
        'site': {
          templateUrl: 'tpl/site-settings.html'
        }
      }
    })

    .state('site.synchronization', {
      url: '/synchronization',
      views: {
        'site': {
          templateUrl: 'tpl/site-synchronization.html'
        }
      }
    })

    .state('login', {
      url: '/login',
      abstract: true,
      templateUrl: 'tpl/login.html',
      cache: false,   // Disable caching to force controller reload.
      onEnter: function($ionicHistory) {
        // Ensure that there is no history stack when getting here.
        $ionicHistory.clearHistory();
      }
    })

    .state('login.index', {
      url: '/index',
      templateUrl: 'tpl/login-index.html',
      controller: 'mmAuthLoginCtrl',
      onEnter: function($state, mmAuth) {
        // Skip this page if there are no identities yet.
        if (!mmAuth.hasIdentities()) {
          $state.go('login.site');
        }
      }
    })

    .state('login.site', {
      url: '/site',
      templateUrl: 'tpl/login-site.html',
      controller: 'mmAuthSiteCtrl',
    })

    .state('login.credentials', {
      url: '/cred',
      templateUrl: 'tpl/login-credentials.html',
      controller: 'mmAuthCredCtrl',
      params: {
        url: ''
      },
      onEnter: function($state, $stateParams) {
        // Do not allow access to this page when the URL was not passed.
        if (!$stateParams.url) {
          $state.go('login.index');
        }
      }
    });

  // Default redirect to the login page.
  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state = $injector.get('$state');
    $state.go('login.index');
  }); 

  // Set lang files location and load current language
  $translateProvider.useStaticFilesLoader({
    prefix: 'lang/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage(window.sessionStorage.lang || 'en');
  // If a key is not found for the current language, search in the English file.
  $translateProvider.fallbackLanguage('en'); 

})

.controller('sideMenuCtrl', function($scope, $state, mmAuth) {

  $scope.logout = function() {
    mmAuth.logout();
    $state.go('login.index');
  };

});

