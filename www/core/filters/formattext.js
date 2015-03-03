angular.module('mm')

.filter('formatText', function(md5, mmConfig, mmUtil) {
    return function(text) {
        if (!text) {
            return '';
        }
        // Links should open in new browser.
        text = text.replace(/<a([^>]+)>/g,"<a target=\"_blank\" $1>");

        // Multilang tags (TODO)
        // Match the current language
        // var re = new RegExp('<(?:lang|span)[^>]+lang="' + MM.lang.current + '"[^>]*>(.*?)<\/(?:lang|span)>',"g");
        // text = text.replace(re, "$1");
        // Delete the rest of languages
        // text = text.replace(/<(?:lang|span)[^>]+lang="([a-zA-Z0-9_-]+)"[^>]*>(.*?)<\/(?:lang|span)>/g,"");

        var current_site = mmConfig.get('current_site');

        // TeX filter. (Special case for labels mainly).
        var ft = text.match(/\$\$(.+?)\$\$/);
        if (ft) {
            if(current_site) {
                text = text.replace(/\$\$(.+?)\$\$/g, function(full, match) {
                    if (!match) {
                        return "";
                    }
                    var md5 = md5.createHash(match);
                    return '<img src="' + current_site.siteurl + "/filter/tex/pix.php/" + md5 + '">';
                });
            }
        }

        // Replace the pluginfile download links with the correct ones.

        if (!current_site) {
            return text;
        }
        // Escape the special chars in the site URL (we use the site url as part of the pattern).
        var url = current_site.siteurl.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        // Add the missing part of the reg. expr. We replace src/links like "http://..." or 'http://...'
        var expr = new RegExp(url + "[^\"']*", "gi");
        text = text.replace(expr, function(match) {
            if (!courseId) {
                courseId = 1;
            }
            return mmUtil.getMoodleFilePath(match, courseId);
        });

        return text;
    }
});