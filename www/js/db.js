angular.module('mm.db', [])

.factory('mmDB', function($q) {

    // var schema = {
    //     autoSchema: true,
    //     stores: [
    //         {
    //             name: 'site',
    //             keyPath: 'id',
    //             indexes: []
    //         }
    //     ]
    // };

    var appDB = new ydn.db.Storage('MoodleMobile'),
        siteDB,
        self = {};

    self.getSiteDBName = function(siteid) {
        return 'Site-'+siteid;
    };

    self.useSite = function(siteid) {
        if(typeof(siteDB) != 'undefined') {
            siteDB.close();
        }

        var deferred = $q.defer();
        siteDB = new ydn.db.Storage(self.getSiteDBName(siteid));
        siteDB.onReady(function(e){
            if(e) {
                if(e.target.error){
                    console.log(e.target.error);
                }
                deferred.reject();
            } else {
                deferred.resolve();
            }
        })
        return deferred.promise;
    };

    self.closeSite = function(siteid) {
        siteDB.close();
        siteDB = undefined;
    };

    self.deleteSite = function(siteid) {
        var databaseName = self.getSiteDBName(siteid);
        if(typeof(siteDB) != 'undefined' && siteDB.getName() == databaseName) {
            siteDB.close();
            siteDB = undefined;
        }
        return ydn.db.deleteDatabase(databaseName);
    };

    self.get = function(table, id) {
        return db.get(table, id);
    };

    self.getAll = function(table) {
        return db.values(table);
    };

    self.getAllKeys = function(table) {
        return db.keys(table);
    };

    self.count = function(table) {
        return db.count(table);
    };

    self.insert = function(table, value) {
        return db.put(table, value);
    };

    self.getWhereEqual = function(table, key, value) {
        return db.from(table).where(key, '=', value).list();
    };

    self.testSwitchAndDelete = function() {
        self.useSite(1).then(function() {
            siteDB.put('courses', {name: 'One'}, 1);
            siteDB.put('courses', {name: 'Two'}, 2);
            siteDB.put('courses', {name: 'Three'}, 3);
            siteDB.values('courses').then(function(entries){
                console.log('Entries in site 1: '+JSON.stringify(entries));
                self.useSite(2).then(function() {
                    siteDB.put('courses', {name: 'A'}, 1);
                    siteDB.put('courses', {name: 'B'}, 2);
                    siteDB.values('courses').then(function(entries){
                        console.log('Entries in site 2: '+JSON.stringify(entries));
                        self.useSite(1).then(function() {
                            siteDB.values('courses').then(function(entries){
                                console.log('Entries in site 1 again: '+JSON.stringify(entries));
                                self.deleteSite(1).then(function() {
                                    console.log('We have deleted current site. Type of siteDB '+typeof(siteDB));
                                    setTimeout(function(){ // If we don't use setTimeout it crashes in iOS
                                        self.useSite(1).then(function() {
                                            console.log('Site 1 created again');
                                            siteDB.values('courses').then(function(entries){
                                                console.log('Entries in site 1 after delete: '+JSON.stringify(entries));
                                                self.useSite(2).then(function() {
                                                    siteDB.values('courses').then(function(entries){
                                                        console.log('Entries in site 2 after deleting 1: '+JSON.stringify(entries));
                                                    });
                                                });
                                            });
                                        });
                                    }, 100);
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    return self;

})
