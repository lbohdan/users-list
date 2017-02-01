(function () {
    'use strict';

    angular.module('testTask')
        .component('ttUsers', {
            bindings: {
                users: '<'
            },
            templateUrl: 'js/components/users/users.tpl.html',
            controller: TtUsersController
        });

    function TtUsersController() {
        var ctrl = this;

        ctrl.selectedUser = null;

        ctrl.selectUser = selectUser;

        //
        // Public methods
        //

        function selectUser(newSelectedUser) {

            // if click again on the same user it should unselect
            if (ctrl.selectedUser === newSelectedUser) {
                ctrl.selectedUser = null;
                newSelectedUser.selected = false;
            } else {
                if (ctrl.selectedUser !== null) {
                    ctrl.selectedUser.selected = false;
                }
                newSelectedUser.selected = true;
                ctrl.selectedUser = newSelectedUser;
            }
        }

    }
}());
