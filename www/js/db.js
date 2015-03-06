angular.module('mm.db', [])

.factory('mmDB', function($q) {

    /** Define the storage schema. Mandatory to use in-line keys. */
    var app_schema = {
        autoSchema: true,
        stores: [
            {
                name: 'settings',
                keyPath: 'id'
            },
            {
                name: 'sites',
                keyPath: 'id'
            },
            {
                name: 'cache',
                keyPath: 'id'
            },
            {
                name: 'services',
                keyPath: 'id'
            }
        ]
    };

    var site_schema = {
        autoSchema: true,
        stores: [
            {
                name: 'preferences',
                keyPath: 'id'
            },
            {
                name: 'courses',
                keyPath: 'id'
            },
            {
                name: 'groups',
                keyPath: 'id'
            },
            {
                name: 'users',
                keyPath: 'id'
            },
            {
                name: 'usergroups',
                keyPath: 'id'
            },
            {
                name: 'cache',
                keyPath: 'id'
            },
            {
                name: 'sync',
                keyPath: 'id'
            }
        ]
    };

    var appDB = new ydn.db.Storage('MoodleMobile', app_schema),
        siteDB,
        self = {};

    /**
     * Get the database object to use.
     * @param  {Boolean} useSite True if siteDB should be used, false otherwise.
     * @return {Object}          DB.
     */
    self.getDB = function(useSite) {
        return useSite ? siteDB : appDB;
    };

    /**
     * Get the name of a site DB.
     * @param  {String} siteid ID of the site.
     * @return {String}        DB name.
     */
    self.getSiteDBName = function(siteid) {
        return 'Site-'+siteid;
    };

    /**
     * Change the current site DB to use the one specified by parameter.
     * @param  {String} siteid ID of the site.
     * @return {Promise}       Promise to be resolved when the site DB is ready.
     */
    self.useSite = function(siteid) {
        if(typeof(siteDB) != 'undefined') {
            self.closeSite();
        }

        var deferred = $q.defer();
        siteDB = new ydn.db.Storage(self.getSiteDBName(siteid), site_schema);
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

    /**
     * Close the current site DB.
     */
    self.closeSite = function() {
        siteDB.close();
        siteDB = undefined;
    };

    /**
     * Delete a site DB.
     * @param  {String} siteid ID of the site.
     * @return {Promise}       Promise to be resolved when the site DB is deleted.
     */
    self.deleteSite = function(siteid) {
        var databaseName = self.getSiteDBName(siteid);
        if(typeof(siteDB) != 'undefined' && siteDB.getName() == databaseName) {
            self.closeSite();
        }
        return ydn.db.deleteDatabase(databaseName);
    };

    /**
     * Retrieve an entry from a local database.
     * @param  {String}  table   Name of the table to get the entry from.
     * @param  {String}  id      ID of the value to get.
     * @param  {Boolean} useSite True if it should use the current site DB, false if it should use the app DB.
     * @return {Promise}         Promise to be resolved when the value is retrieved.
     */
    self.get = function(table, id, useSite) {
        var deferred = $q.defer();

        var db = getDB(useSite);
        try{
            if(typeof(db) != 'undefined') {
                db.get(table, id).then(function(entry) {
                    if(typeof(entry) == 'undefined') {
                        deferred.reject();
                    } else {
                        deferred.resolve(entry);
                    }
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            console.log('Error getting value from db. '+ex.name+': '+ex.message);
            deferred.reject();
        }

        return deferred.promise;
    };

    /**
     * Retrieve an entry from a local database.
     * @param  {String}  table   Name of the table to get the entry from.
     * @param  {Boolean} useSite True if it should use the current site DB, false if it should use the app DB.
     * @return {Promise}         Promise to be resolved when the value is retrieved.
     */
    self.getAll = function(table, useSite) {
        var deferred = $q.defer();

        var db = getDB(useSite);
        try{
            if(typeof(db) != 'undefined') {
                db.values(table, undefined, 99999999).then(function(entries) {
                    if(typeof(entries) == 'undefined') {
                        deferred.reject();
                    } else {
                        deferred.resolve(entries);
                    }
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            console.log('Error getting value from db. '+ex.name+': '+ex.message);
            deferred.reject();
        }

        return deferred.promise;
    };

    /**
     * Get the number of entries of a certain table in a local DB.
     * @param  {String}  table   Name of the table to get the entry from.
     * @param  {Boolean} useSite True if it should use the current site DB, false if it should use the app DB.
     * @return {Promise}         Promise to be resolved when the count is retrieved.
     */
    self.count = function(table, useSite) {
        var deferred = $q.defer();

        var db = getDB(useSite);
        try{
            if(typeof(db) != 'undefined') {
                db.count(table).then(function(count) {
                    deferred.resolve(count);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            console.log('Error counting from db. '+ex.name+': '+ex.message);
            deferred.reject();
        }

        return deferred.promise;
    };

    /**
     * Store an entry into the local DB.
     * @param  {String}  table   Name of the table to store the entry to.
     * @param  {Object}  value   Entry to store.
     * @param  {Boolean} useSite True if it should use the current site DB, false if it should use the app DB.
     * @return {Promise}         Promise to be resolved when the entry is stored.
     */
    self.insert = function(table, value, useSite) {
        var deferred = $q.defer();

        var db = getDB(useSite);
        try{
            if(typeof(db) != 'undefined') {
                db.put(table, value).then(function(key) {
                    deferred.resolve(key);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            console.log('Error inserting to db '+JSON.stringify(value)+'. '+ex.name+': '+ex.message);
            deferred.reject();
        }

        return deferred.promise;
    };

    /**
     * Retrieve the list of entries matching certain conditions.
     * @param  {String}  table      Name of the table to get the entries from.
     * @param  {Boolean} useSite    True if it should use the current site DB, false if it should use the app DB.
     * @param  {String}  field_name Name of the field that should match the conditions.
     * @param  {String}  op         First operator symbol. One of '<', '<=', '=', '>', '>=', '^'.
     * @param  {String}  value      Value for the first operator.
     * @param  {String}  op2        Second operator symbol.
     * @param  {String}  value2     Value for the second operator.
     * @return {Promise}            Promise to be resolved when the list is retrieved.
     */
    self.where = function(table, useSite, field_name, op, value, op2, value2) {
        var deferred = $q.defer();

        var db = getDB(useSite);
        try{
            if(typeof(db) != 'undefined') {
                db.from(table).where(field_name, op, value, op2, value2).list().then(function(list) {
                    deferred.resolve(list);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            console.log('Error inserting to db '+JSON.stringify(value)+'. '+ex.name+': '+ex.message);
            deferred.reject();
        }

        return deferred.promise;
    };

    /**
     * Retrieve the list of entries where a certain field is equal to a certain value.
     * @param  {String}  table      Name of the table to get the entries from.
     * @param  {Boolean} useSite    True if it should use the current site DB, false if it should use the app DB.
     * @param  {String}  field_name Name of the field to check.
     * @param  {String}  value      Value the field should be equal to.
     * @return {Promise}            Promise to be resolved when the list is retrieved.
     */
    self.getWhereEqual = function(table, useSite, field_name, value) {
        var deferred = $q.defer();

        var db = getDB(useSite);
        try{
            if(typeof(db) != 'undefined') {
                db.from(table).where(field_name, '=', value).list().then(function(list) {
                    deferred.resolve(list);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            console.log('Error inserting to db '+JSON.stringify(value)+'. '+ex.name+': '+ex.message);
            deferred.reject();
        }

        return deferred.promise;
    };

    /**
     * Performs an operation with every entry in a certain table.
     * @param  {String}   table    Name of the table to get the entries from.
     * @param  {Boolean}  useSite  True if it should use the current site DB, false if it should use the app DB.
     * @param  {Function} callback Function to call with each entry.
     * @return {Promise}           Promise to be resolved when the the operation has been applied to all entries.
     */
    self.each = function(table, useSite, callback) {
        var deferred = $q.defer();

        self.getAll(table, useSite).then(function(entries) {
            for(var i = 0; i < entries.length; i++) {
                callback(entries[i]);
            }
            deferred.resolve();
        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    };

    /**
     * Remove an entry from the local DB.
     * @param  {String}  table   Name of the table to remove the entry from.
     * @param  {String}  id      ID of the value to remove.
     * @param  {Boolean} useSite True if it should use the current site DB, false if it should use the app DB.
     * @return {Promise}         Promise to be resolved when the value is deleted.
     */
    self.remove = function(table, id, useSite) {
        var deferred = $q.defer();

        var db = getDB(useSite);
        try{
            if(typeof(db) != 'undefined') {
                db.remove(table, id).then(function(number) {
                    deferred.resolve(number);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            console.log('Error removing from db. '+ex.name+': '+ex.message);
            deferred.reject();
        }

        return deferred.promise;
    };


    /** TESTS */

    // self.testSwitchAndDelete = function() {
    //     self.useSite(1).then(function() {
    //         siteDB.put('courses', {name: 'One'}, 1);
    //         siteDB.put('courses', {name: 'Two'}, 2);
    //         siteDB.put('courses', {name: 'Three'}, 3);
    //         siteDB.values('courses').then(function(entries){
    //             console.log('Entries in site 1: '+JSON.stringify(entries));
    //             self.useSite(2).then(function() {
    //                 siteDB.put('courses', {name: 'A'}, 1);
    //                 siteDB.put('courses', {name: 'B'}, 2);
    //                 siteDB.values('courses').then(function(entries){
    //                     console.log('Entries in site 2: '+JSON.stringify(entries));
    //                     self.useSite(1).then(function() {
    //                         siteDB.values('courses').then(function(entries){
    //                             console.log('Entries in site 1 again: '+JSON.stringify(entries));
    //                             self.deleteSite(1).then(function() {
    //                                 console.log('We have deleted current site. Type of siteDB '+typeof(siteDB));
    //                                 setTimeout(function(){ // If we don't use setTimeout it crashes in iOS
    //                                     self.useSite(1).then(function() {
    //                                         console.log('Site 1 created again');
    //                                         siteDB.values('courses').then(function(entries){
    //                                             console.log('Entries in site 1 after delete: '+JSON.stringify(entries));
    //                                             self.useSite(2).then(function() {
    //                                                 siteDB.values('courses').then(function(entries){
    //                                                     console.log('Entries in site 2 after deleting 1: '+JSON.stringify(entries));
    //                                                 });
    //                                             });
    //                                         });
    //                                     });
    //                                 }, 100);
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // };

    // var oneMB = '';
    // var testDB = new ydn.db.Storage('TestDB', {
    //     stores: [{
    //         name: 'test',
    //         keyPath: 'id',
    //         autoIncrement: false
    //     }]
    // });


    // self.testMaxStorageSize = function(usedMB) {
    //     window.testDB = testDB;
    //     window.oneMB = oneMB;
    //     console.log('DB type: '+testDB.getType());
    //     // appDB.keys('test', undefined, 500).then(function(entries) {
    //     //     console.log(entries);
    //     // });
    //     if(oneMB == '') {
    //         for(var i = 0; i < 1024*1024; i++) {
    //             oneMB = oneMB + 'a';
    //         }
    //     }

    //     usedMB = usedMB || 1;
    //     console.log('Inserting 1MB. MB after this insert is done: '+usedMB);
    //     try{
    //         testDB.put('test', {content: oneMB, id:usedMB}).then(function(success) {
    //             console.log('Success inserting');
    //             console.log(success);
    //             testDB.count('test').then(function(count){
    //                 console.log('Number of entries: '+count);
    //             });
    //             setTimeout(function() {
    //                 self.testMaxStorageSize(usedMB + 1);
    //             }, 500);
    //         }, function(error) {
    //             console.log('Fail insert');
    //             console.log(error);
    //         });
    //     }catch(err) {
    //         console.log('Exception inserting');
    //     }
    // };

    return self;

})
