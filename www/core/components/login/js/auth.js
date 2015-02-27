angular.module('mm.auth', [])

.factory('mmAuth', function($http, $q, md5, mmCore, mmConfig, mmUtil) {

    var self = {};
    var store = window.sessionStorage;

    var logindata = {
        siteurl: '',
        username: '',
        password: ''
    };

    self.getLoginData = function() {
        return logindata;
    };

    /**
     * Check if a site is valid and if it has specifics settings for authentication
     * (like force to log in using the browser)
     *
     * @param {string} siteurl URL of the site to check.
     * @param {string} protocol Protocol to use. If not defined, use https.
     * @return {Promise}        A promise to be resolved when the site is checked.
     */
    self.checkSite = function(siteurl, protocol) {

        var deferred = $q.defer();

        var demodata = self.getDemoSiteData(siteurl);
        if( typeof(demodata) != 'undefined' ) {
            // TODO: Treat demo site
        }

        // formatURL adds the protocol if is missing.
        siteurl = mmUtil.formatURL(siteurl);
        if (siteurl.indexOf('http://localhost') == -1 && !mmUtil.isValidURL(siteurl)) {
            deferred.reject('siteurlrequired');
            return deferred.promise;
        }

        protocol = protocol || "https://";

        // Now, replace the siteurl with the protocol.
        siteurl = siteurl.replace(/^http(s)?\:\/\//i, protocol);

        self.siteExists(siteurl).then(function() {

            logindata.siteurl = siteurl;

            self.checkMobileLocalPlugin(siteurl).then(function(code) {
                deferred.resolve(code);
            }, function(error) {
                deferred.reject(error);
            });

        }, function(error) {
            // Site doesn't exist.

            if (siteurl.indexOf("https://") === 0) {
                // Retry
                self.checkSite(siteurl, "http://").then(deferred.resolve, deferred.reject);
            }
            else{
                deferred.reject('cannotconnect');
                //var error = MM.lang.s('cannotconnect');
                // if (error.status == 404) {
                    //error = MM.lang.s('invalidscheme');
                // }
                //MM.popErrorMessage(error);
            }
        });

        return deferred.promise;

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

    /**
     * Check if the local_mobile plugin is installed in the Moodle site
     * This plugin provide extended services
     * @param  {string} siteurl         The Moodle SiteURL
     */
    self.checkMobileLocalPlugin = function(siteurl) {

        var deferred = $q.defer();
        var service = mmConfig.get('wsextservice');

        // First check if is disabled by config.
        if (!service) {
            deferred.resolve(0);
            return deferred.promise;
        }

        $http.post(siteurl + '/local/mobile/check.php', {service: service} )
            .success(function(response) {
                if (typeof(response.code) == "undefined") {
                    deferred.reject("unexpectederror");
                    return;
                }

                var code = parseInt(response.code, 10);
                if (response.error) {
                    switch (code) {
                        case 1:
                            // Site in maintenance mode.
                            deferred.reject("siteinmaintenance");
                            break;
                        case 2:
                            // Web services not enabled.
                            deferred.reject("webservicesnotenabled");
                            break;
                        case 3:
                            // Extended service not enabled, but the official is enabled.
                            deferred.resolve(0);
                            break;
                        case 4:
                            // Neither extended or official services enabled.
                            deferred.reject("mobileservicesnotenabled");
                            break;
                        default:
                            deferred.reject("unexpectederror");
                    }
                } else {
                    // Now we store here the service used by this site.
                    // var service = {
                    //     id: hex_md5(siteurl),
                    //     siteurl: siteurl,
                    //     service: MM.config.wsextservice
                    // };
                    // MM.db.insert("services", service);
                    // TODO: Store service
                    store.setItem('service'+siteurl, service);

                    deferred.resolve(code);
                }
            })
            .error(function(data) {
                deferred.resolve(0);
            });

        return deferred.promise;
    };

    /**
     * Gets a user token from the server.
     * @param {string} siteurl   The site url.
     * @param {string} username  User name.
     * @param {string} password  Password.
     * @param {bool}   retry     We are retrying with a prefixed URL.
     * @return {Promise}         A promise to be resolved when the site is checked.
     */
    self.getUserToken = function(siteurl, username, password, retry) {
        retry = retry || false;
        var deferred = $q.defer();

        var loginurl = siteurl + '/login/token.php';
        var data = {
            username: username,
            password: password,
            service: self.determineService(siteurl)
        };

        $http.post(loginurl, data).success(function(response) {
            console.log(response);

            if (typeof(response.token) != 'undefined') {
                deferred.resolve(response.token);
            } else {

                if (typeof(response.error) != 'undefined') {
                    // We only allow one retry (to avoid loops).
                    if (!retry && response.errorcode == "requirecorrectaccess") {
                        siteurl = siteurl.replace("https://", "https://www.");
                        siteurl = siteurl.replace("http://", "http://www.");
                        logindata.siteurl = siteurl;

                        self.getUserToken(siteurl, username, password, true).then(deferred.resolve, deferred.reject);
                    } else {
                        deferred.reject(response.error);
                    }
                } else {
                    deferred.reject('invalidaccount');
                }
            }
        }).error(function(data) {
            // var error = MM.lang.s('cannotconnect');
            // if (xhr.status == 404) {
            //     error = MM.lang.s('invalidscheme');
            // }
            // MM.popErrorMessage(error);
            deferred.reject('cannotconnect');
        });

        return deferred.promise;
    };

    /**
     * Function for determine which service we should use (default or extended plugin).
     * @param  {string} siteurl The site URL
     * @return {string}         The service shortname
     */
    self.determineService = function(siteurl) {
        // We need to try siteurl in both https or http (due to loginhttps setting).

        // First http://
        siteurl = siteurl.replace("https://", "http://");
        var service = store.getItem('service'+siteurl);
        if (service) {
            // TODO: MM.currentService = service;
            return service;
        }

        // Now https://
        siteurl = siteurl.replace("http://", "https://");
        var service = store.getItem('service'+siteurl);
        if (service) {
            // TODO: MM.currentService = service;
            return service;
        }

        // TODO: MM.currentService = mmConfig.get('wsextservice');
        // Return default service.
        return mmConfig.get('wsextservice');
    };

    /**
     * Save the token retrieved and load the full siteinfo object.
     * @param  {string} siteurl The site URL
     * @param  {str} token      The user token
     * @return {Promise}        A promise to be resolved when the token is saved.
     */
    self.saveToken = function(siteurl, token) {

        var deferred = $q.defer();

        mmConfig.set('current_token', token); // TODO: It can be done later if we don't need it in moodleWSCall

        var preSets = {
            wstoken: token,
            siteurl: siteurl,
            silently: true,
            getFromCache: false,
            saveToCache: true
        };

        function siteDataRetrieved(site) {
            if(self.isValidMoodleVersion(site.functions)) {
                self.saveSite(site, token);
                deferred.resolve();
            } else {
                deferred.reject('invalidmoodleversion'+'2.4');
            }
        }

        // We have a valid token, try to get the site info.
        mmCore.moodleWSCall('moodle_webservice_get_siteinfo', {}, preSets).then(siteDataRetrieved, function(error) {
            mmCore.moodleWSCall('core_webservice_get_site_info', {}, preSets).then(siteDataRetrieved, function(error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    /**
     * Check for the minimum required version. We check for WebServices present, not for Moodle version.
     * This may allow some hacks like using local plugins for adding missing functions in previous versions.
     * @param {Array} sitefunctions List of functions of the Moodle site.
     * @return {Boolean}            True if t
     */
    self.isValidMoodleVersion = function(sitefunctions) {
        for(var i = 0; i < sitefunctions.length; i++) {
            if (sitefunctions[i].name.indexOf("component_strings") > -1) {
                return true;
            }
        }
        return false;
    };

    /**
     * Saves the site in local DB.
     * @param  {Object} site  Moodle site data returned from the server.
     * @param  {String} token User's token.
     */
    self.saveSite = function(site, token) {
        site.id = md5.createHash(site.siteurl + site.username);
        site.token = token;
        mmConfig.set('current_site', site);
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
        templateUrl: 'core/components/login/tpl/login.html',
        cache: false,   // Disable caching to force controller reload.
        onEnter: function($ionicHistory) {
            // Ensure that there is no history stack when getting here.
            $ionicHistory.clearHistory();
        },
        resolve: {
            config: function(mmConfig) {
                return mmConfig.initConfig();
            }
        }
    })

    .state('login.index', {
        url: '/index',
        templateUrl: 'core/components/login/tpl/login-index.html',
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
        templateUrl: 'core/components/login/tpl/login-site.html',
        controller: 'mmAuthSiteCtrl',
    })

    .state('login.credentials', {
        url: '/cred',
        templateUrl: 'core/components/login/tpl/login-credentials.html',
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

