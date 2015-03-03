angular.module('mm')

.filter('removeHtmlTags', function() {
    return function(text) {
        return String(text).replace(/(<([^>]+)>)/ig, '');
    }
});