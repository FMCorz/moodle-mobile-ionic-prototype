angular.module('mm.config', [])

.factory('mmConfig', function($http, $q) {

    var self = {};
    self.config = {};

    self.initConfig = function() {

        var deferred = $q.defer();

        if( Object.keys(self.config).length > 0) {
            // Already loaded
            deferred.resolve();
            return deferred.promise;
        }

        $http.get('config.json')
            .then(function(response) {
                self.config = response.data;
                deferred.resolve();
            }, function(response) {
                deferred.reject();
            });

        return deferred.promise;
    };

    self.get = function(name) {
        return self.config[name];
    };

    self.set = function(name, value) {
        // TODO: Store it in local DB
        self.config[name] = value;
    };

    return self;

});