angular.module('mm.util', [])

.provider('mmUtil', function() {

    this.param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null) query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    function mmUtil(mmConfig) {

        /**
         * Formats a URL, trim, lowercase, etc...
         * @param  {str} url The url to be formatted
         * @return {str}     The url formatted
         */
        this.formatURL = function(url) {

            url = url.trim();

            // Check if the URL starts by http or https.
            if (! /^http(s)?\:\/\/.*/i.test(url)) {
                // Test first allways https.
                url = "https://" + url;
            }

            // http allways in lowercase.
            url = url.replace(/^http/i, 'http');
            url = url.replace(/^https/i, 'https');

            // Replace last slash.
            url = url.replace(/\/$/, "");

            return url;
        };

        /**
         * Validates a URL for a specific pattern.
         * @param {String} url The url to test against the pattern
         * @return {bool} TRUE if the url matches the expected pattern.
         *                FALSE otherwise.
         */
        this.isValidURL = function(url) {
            return /^http(s)?\:\/\/([\da-zA-Z\.-]+)\.([\da-zA-Z\.]{2,6})([\/\w \.-]*)*\/?/i.test(url);
        };

        /**
         * Converts an objects values to strings where appropriate.
         * Arrays (associative or otherwise) will be maintained.
         *
         * @param {Object} data The data that needs all the non-object values set to strings.
         * @return {Object} The cleaned object, with multilevel array and objects preserved.
         */
        this.convertValuesToString = function(data) {
            var result = [];
            if (!angular.isArray(data) && angular.isObject(data)) {
                result = {};
            }
            for (var el in data) {
                if (angular.isObject(data[el])) {
                    result[el] = this.convertValuesToString(data[el]);
                } else {
                    result[el] = data[el] + '';
                }
            }
            return result;
        };

        /**
         * Check if a web service is available in the remote Moodle site.
         *
         * @return {bool} True if the web service exists (depends on Moodle version)
         */
        this.wsAvailable = function(wsName) {
            var current_site = mmConfig.get('current_site');
            if (!current_site) {
                return false;
            }

            for(var i = 0; i < current_site.functions.length; i++) {
                var f = current_site.functions[i];
                if (f.name == wsName) {
                    return true;
                }
            }
            return false;
        };
    }

    this.$get = function(mmConfig) {
        return new mmUtil(mmConfig);
    };
});
