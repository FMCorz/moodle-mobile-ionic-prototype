angular.module('mm.util', [])

.factory('mmUtil', function() {

    var self = {};

    /**
     * Formats a URL, trim, lowercase, etc...
     * @param  {str} url The url to be formatted
     * @return {str}     The url formatted
     */
    self.formatURL = function(url) {

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
    self.isValidURL = function(url) {
        return /^http(s)?\:\/\/.*/i.test(url)
    };

    return self;

});