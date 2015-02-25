angular.module('mm.auth', [])

.factory('mmAuth', function($http, mmConfig, mmUtil) {

    var self = {};
    var store = window.sessionStorage;

    /**
     * Check if a site is valid and if it has specifics settings for authentication
     * (like force to log in using the browser)
     *
     * @param {string} siteurl URL of the site to check.
     */
    self.checkSite = function(siteurl, protocol) {

        var demodata = self.getDemoSiteData(siteurl);
        if( typeof(demodata) != 'undefined' ) {
            // TODO: Treat demo site
        }

        // formatURL adds the protocol if is missing.
        siteurl = mmUtil.formatURL(siteurl);
        if (siteurl.indexOf('http://localhost') == -1 && !mmUtil.isValidURL(siteurl)) {
            // TODO: Show error message with ngMessages: siteurlrequired
            return;
        }

        if (typeof(protocol) == "undefined") {
            protocol = "https://";
        }

        // Now, replace the siteurl with the protocol.
        siteurl = siteurl.replace(/^http(s)?\:\/\//i, protocol);

        self.siteExists(siteurl).then(function() {

        }, function() {
            // Site doesn't exist.
            var error = MM.lang.s('cannotconnect');

            if (siteurl.indexOf("https://") === 0) {
                self.checkSite(siteurl, "http://");
                return;
            }
            else if (xhr.status == 404) {
                error = MM.lang.s('invalidscheme');
            }
            MM.popErrorMessage(error);
        });

    };

    /**
     * Get the demo data of the siteurl if it is a demo site.
     * @param  {String} siteurl URL of the site to check.
     * @return {Object}         Demo data if the site is a demo site, undefined otherwise.
     */
    self.getDemoSiteData = function(siteurl) {
        var demo_sites = mmConfig.get('demo_sites');

        for(var i = 0; i < demo_sites.length; i++) {
            if(siteurl == demo_sites[i].key) {
                return demo_sites[i];
            }
        }

        return undefined;
    };

    /**
     * Check if a site exists.
     * @param  {String} siteurl URL of the site to check.
     * @return {Promise}        A promise to be resolved when the check finishes.
     */
    self.siteExists = function(siteurl) {
        return $http.head(siteurl + '/login/token.php', {timeout: 15000});
    };

    self.isLoggedIn = function() {
        return store.isLoggedIn && parseInt(store.isLoggedIn, 10) === 1;
    };

    self.login = function() {
        store.isLoggedIn = '1';
    };

    self.logout = function() {
        store.isLoggedIn = '0';
    };

    self.addIdentity = function(data) {
        var identities = self.getIdentities();
        identities.push(data);
        store.identities = JSON.stringify(identities);
    };

    self.deleteIdentity = function(index) {
        var identities = self.getIdentities();
        identities.splice(index, 1);
        store.identities = JSON.stringify(identities);
    };

    self.hasIdentities = function() {
        var identities = self.getIdentities();
        return identities.length > 0;
    };

    self.getIdentities = function() {
        var identities = store.identities;
        if (!identities) {
            return [];
        }
        return JSON.parse(identities);
    };

    return self;

})

.config(function($stateProvider) {

    $stateProvider

    .state('login', {
      url: '/login',
      abstract: true,
      templateUrl: 'app/components/core/login/tpl/login.html',
      cache: false,   // Disable caching to force controller reload.
      onEnter: function($ionicHistory) {
        // Ensure that there is no history stack when getting here.
        $ionicHistory.clearHistory();
      }
    })

    .state('login.index', {
      url: '/index',
      templateUrl: 'app/components/core/login/tpl/login-index.html',
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
      templateUrl: 'app/components/core/login/tpl/login-site.html',
      controller: 'mmAuthSiteCtrl',
    })

    .state('login.credentials', {
      url: '/cred',
      templateUrl: 'app/components/core/login/tpl/login-credentials.html',
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

})
;

