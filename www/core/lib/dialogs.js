angular.module('mm.dialogs', [])

.factory('mmDialogs', function($ionicLoading, $ionicPopup) {

    var deprecatedFunctions = {
        "moodle_webservice_get_siteinfo": "core_webservice_get_site_info",
        "moodle_enrol_get_users_courses": "core_enrol_get_users_courses",
        "moodle_notes_create_notes": "core_notes_create_notes",
        "moodle_message_send_instantmessages": "core_message_send_instant_messages",
        "moodle_user_get_users_by_courseid": "core_enrol_get_enrolled_users",
        "moodle_user_get_course_participants_by_id": "core_user_get_course_user_profiles",
    };

    var self = {};

    /**
     * Displays a loading modal window
     *
     * @param {string} title The text of the modal window
     */
    self.showModalLoading = function(text) {
        $ionicLoading.show({
            template: '<i class="icon ion-load-c">'+text
        });
    };

    /**
     * Close a modal loading window
     */
    self.closeModalLoading = function() {
        $ionicLoading.hide();
    };

    /**
     * Generic pop up confirm window.
     *
     * @param {string} title The title to be displayed.
     * @param {string} text  The text to be displayed.
     * @return {Promise}     Promise resolved when the user confirms and rejected when the user cancels.
     */
    self.popConfirm = function(title, text) {
        return $ionicPopup.confirm({
            title: title,
            template: text
        });
    };

    return self;

});