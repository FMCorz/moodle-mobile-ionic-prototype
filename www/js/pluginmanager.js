angular.module('mm.pluginmanager', [])

.factory('mmPluginManager', function($http, $q, $ocLazyLoad) {

    var self = {};
    self.plugins = [];

    self.getListToDownload = function() {
        // This list should be retrieved using a WS call.
        return [
            {
                "module": "mm.events",
                "service": "mmEventsPlugin",
                "url": "https://raw.githubusercontent.com/FMCorz/moodle-mobile-ionic-prototype/LazyLoad/www/js/events.js"
            }
        ];
    };

    self.downloadPlugins = function() {

        var deferred = $q.defer();

        if(self.plugins.length > 0) {
            deferred.resolve();
            return deferred.promise;
        }

        self.plugins = this.getListToDownload();

        var treated = 0, total = self.plugins.length;

        angular.forEach(self.plugins, function(plugin) {
            self.downloadPlugin(plugin, function(entry) {
                if(typeof(entry) != 'undefined') {
                    plugin.files = [entry.toInternalURL()];
                } else {
                    delete plugin;
                }

                treated++;
                if(treated == total) {
                    deferred.resolve();
                }
            });
        });

        return deferred.promise;
    };

    self.downloadPlugin = function(plugin, callBack) {
        var fileTransfer = new FileTransfer();

        // var filename = plugin.url.substr(plugin.url.lastIndexOf('/') + 1);

        // FileSystem should be handled by its own Service/Factory
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {

                var filepath = fileSystem.root.toURL()+'/com.moodle.moodlemobile/'+plugin.module+'/main.js';

                fileTransfer.download(
                    plugin.url,
                    filepath,
                    callBack,
                    function(error) {
                        console.log('Error downloading plugin '+plugin.module+': '+error.code);
                        callBack();
                    }
                );

            }, function() {
                console.log("Critical error accessing file system");
            }
       );
    };

    self.loadPlugins = function(plugins) {
        var formattedPlugins = [];
        angular.forEach(self.plugins, function(plugin) {
            if(typeof(plugin.files) != 'undefined') {
                formattedPlugins.push({
                    name: plugin.module,
                    files: plugin.files
                });
            }
        });
        return $ocLazyLoad.load(formattedPlugins);
    };

    self.getPlugins = function() {
        return self.plugins;
    };

    return self;

});