angular.module('mm', ['ionic', 'mm.auth', 'mm.files'])

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

.config(function($stateProvider, $urlRouterProvider) {

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
          templateUrl: 'tpl/site-index.html'
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

  // Default redirect to the login page.
  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state = $injector.get('$state');
    $state.go('login.index');
  });

})

.controller('sideMenuCtrl', function($scope, $state, mmAuth) {

  $scope.logout = function() {
    mmAuth.logout();
    $state.go('login.index');
  }

})

