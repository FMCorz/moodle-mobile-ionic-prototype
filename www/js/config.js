angular.module('mm.config', [])

.service('mmConfig', function($http, $q) {

    var self = this;
    self.config = {};

    this.initConfig = function() {

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

    this.getConfig = function(name) {
        return self.config[name];
    };

    this.getPluginsForLazyLoad = function() {
        var formattedPlugins = [];

        for(var pluginName in self.config.plugins) {
            formattedPlugins.push({
                name: pluginName,
                files: self.config.plugins[pluginName]
            });
        }

        return formattedPlugins;
    };

});