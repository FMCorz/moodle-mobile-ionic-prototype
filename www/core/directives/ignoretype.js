angular.module('mm')

.directive('ignoreType', function() {
    return {
        restrict: 'A',
        priority: 500,
        compile: function(el, attrs) {
            attrs.$set('type',
                null,                //to delete type from attributes object
                false                //to preserve type attribute in DOM
            );
        }
    }
});