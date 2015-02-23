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

    this.getPlugins = function(type) {
        return self.config.plugins[type];
    };

    this.getPluginsForLazyLoad = function() {
        var formattedPlugins = [];

        for(var pluginType in self.config.plugins) {
            for(var i = 0; i < self.config.plugins[pluginType].length; i++) {
                formattedPlugins.push({
                    name: self.config.plugins[pluginType][i].module,
                    files: self.config.plugins[pluginType][i].files
                });
            }
        }

        return formattedPlugins;
    };

});