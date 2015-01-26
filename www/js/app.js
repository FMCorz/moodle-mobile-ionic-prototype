angular.module('mm', [
  'ionic',
  'mm.auth',
  'mm.site',
  'mm.files',
  'mm.messages',
  'mm.appsettings',
  'mm.sections',
  'mm.forums',
  'pascalprecht.translate'])

.run(function($ionicPlatform, $rootScope, $state, mmAuth, $ionicBody, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var checkTablet = function() {
      $ionicBody.enableClass($window.matchMedia('(min-width:600px)').matches, 'tablet');
    };
    ionic.on('resize', checkTablet, $window);
    checkTablet();
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    if (toState.name.substr(0, 5) !== 'login' && toState.name.substr(0, 13) !== 'site.settings' && !mmAuth.isLoggedIn()) {
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

  $rootScope.$on('$ionicView.beforeEnter', function () {
      $rootScope.$root.hideMenuIcon = !mmAuth.isLoggedIn();
  });

})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  // Ugly hack to "decorate" the $stateProvider.state() method.
  // This allows us to automagically define 'tablet' states which use split views.
  // We can probably do this better, or define our own $stateProvider to clean this up.
  var $mmStateProvider = {
    state: function(name, stateConfig) {
      function setupTablet(state) {
        if (!state.tablet) {
          return;
        }

        // Support shorthand tablet definition.
        if (angular.isString(state.tablet)) {
          state.tablet = {
            parent: state.tablet
          }
        }

        var params = state.tablet,
            parent = params.parent,
            node = params.node || 'tablet',
            config = {};

        // Remove any trace from the state object.
        delete state['tablet'];

        // Prepare the default parameters for the tablet.
        delete params['node'];
        delete params['parent'];
        angular.copy(state, config);
        angular.extend(config, params);

        // We can only support 1 view at the moment.
        if (config.views.length > 1) {
          console.log('Cannot guess the view data to use for tablet state of ' + name);
          return;
        }

        // Find view name.
        var viewName, viewData;
        angular.forEach(config.views, function(v, k) {
          viewName = k;
          viewData = v;
        }, this);

        // Delete the original view and replace with the new one.
        delete config.views[viewName];
        config.views['tablet'] = viewData;

        // Define the new tablet state.
        $stateProvider.state.apply($stateProvider, [parent + '.' + node, config]);
      }

      setupTablet.apply(this, [stateConfig]);
      $stateProvider.state.apply($stateProvider, [name, stateConfig]);
      return this;
    }
  }

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $mmStateProvider

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
          templateUrl: 'tpl/site-sections.html',
          controller: 'mmSiteSections'
        }
      }
    })

    .state('site.section-all', {
      tablet: {
        parent: 'site.sections',
        node: 'all'
      },
      url: '/section-all',
      views: {
        'site': {
          templateUrl: 'tpl/site-section-all.html',
          controller: 'mmSiteSection'
        }
      }
    })

    .state('site.section-one', {
      tablet: {
        parent: 'site.sections',
        node: 'one'
      },
      url: '/section-one',
      views: {
        'site': {
          templateUrl: 'tpl/site-section.html',
          controller: 'mmSiteSection'
        }
      }
    })

  // .state('site.sections.one', {
  //     url: '/one',
  //     views: {
  //       'sectionsTablet': {
  //         templateUrl: 'tpl/site-section.html',
  //         controller: 'mmSiteSections'
  //       }
  //     }
  //   })

  // .state('site.sections.all', {
  //     url: '/all',
  //     views: {
  //       'sectionsTablet': {
  //         templateUrl: 'tpl/site-section-all.html',
  //         controller: 'mmSiteSections'
  //       }
  //     }
    // })

    .state('site.label', {
      url: '/label',
      views: {
        'site': {
          templateUrl: 'tpl/site-label.html'
        }
      }
    })

    .state('site.folder', {
      url: '/folder',
      views: {
        'site': {
          templateUrl: 'tpl/site-folder.html'
        }
      }
    })

    .state('site.forum', {
      url: '/forum',
      views: {
        'site': {
          templateUrl: 'tpl/site-forum.html',
          controller: 'mmDiscussions'
        }
      }
    })

    // .state('site.forum.discussion', {
    //   url: '/discussion',
    //   views: {
    //     'tablet': {
    //       templateUrl: 'tpl/site-discussion.html',
    //       controller: 'mmDiscussionPosts'
    //     }
    //   }
    // })

    .state('site.discussion', {
      tablet: 'site.forum',
      url: '/discussion',
      views: {
        'site': {
          templateUrl: 'tpl/site-discussion.html',
          controller: 'mmDiscussionPosts'
        }
      }
    })

    .state('site.participants', {
      url: '/participants?courseid',
      views: {
        'site': {
          controller: 'mmCourseParticipants',
          templateUrl: 'tpl/site-participants.html'
        }
      }
    })

    .state('site.participant', {
          url: '/participant',
          views: {
            'site': {
              templateUrl: 'tpl/site-participant.html'
            }
          }
        })

    .state('site.grades', {
          url: '/grades',
          views: {
            'site': {
              templateUrl: 'tpl/site-grades.html'
            }
          }
        })

    .state('site.messages', {
      url: '/messages',
      views: {
        'site': {
          controller: 'mmDiscussionsCtrl',
          templateUrl: 'tpl/site-messages.html',
          resolve: {
            discussions: function(mmMessages) {
              return mmMessages.getDiscussions();
            }
          }
        }
      }
    })

    .state('site.messages-discussion', {
      tablet: 'site.messages',
      url: '/messages-discussion/:index',
      views: {
        'site': {
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
          templateUrl: 'tpl/site-preferences.html'
        }
      }
    })

    .state('site.settings', {
      url: '/settings',
      views: {
        'site': {
          controller: 'mmAppSettingsCtrl',
          templateUrl: 'tpl/site-settings.html'
        }
      }
    })

    .state('site.settings-general', {
      url: '/general',
      views: {
        'site': {
          controller: 'mmAppGeneralSettingsCtrl',
          templateUrl: 'tpl/site-settings-general.html'
        }
      }
    })

    .state('site.settings-space-usage', {
      url: '/spaceusage',
      views: {
        'site': {
          controller: 'mmAppSpaceUsageSettingsCtrl',
          templateUrl: 'tpl/site-settings-space-usage.html'
        }
      }
    })

    .state('site.settings-development', {
      url: '/development',
      views: {
        'site': {
          controller: 'mmAppDevelopmentSettingsCtrl',
          templateUrl: 'tpl/site-settings-development.html'
        }
      }
    })

    .state('site.settings-report', {
      url: '/report',
      views: {
        'site': {
          templateUrl: 'tpl/site-settings-report.html'
        }
      }
    })

    .state('site.settings-about', {
      url: '/about',
      views: {
        'site': {
          templateUrl: 'tpl/site-settings-about.html'
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
    })

    ;

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


  $scope.invalidateCaches = function(){
      $scope.$broadcast('scroll.refreshComplete');
  };

});

