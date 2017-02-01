(function () {
    'use strict';

    angular.module('testTask')
        .component('ttUserItem', {
            bindings: {
                userItem: '<',
                onSelectUserCallback: '&'
            },
            templateUrl: 'js/components/users/user-item/user-item.tpl.html',
            controller: TtUserItemController
        });

    function TtUserItemController($scope) {
        var ctrl = this;

        ctrl.isCollapsed = true;

        ctrl.$onInit = onInit;
        ctrl.onClickHandler = onClickHandler;

        //
        // Hook methods
        //

        /**
         * Initialization method
         */
        function onInit() {
            $scope.$on('search-posts_make-search', onSearchFinishedHandler);
        }

        //
        // Public methods
        //

        function onClickHandler() {
            ctrl.isCollapsed = !ctrl.isCollapsed;
            ctrl.onSelectUserCallback({newSelectedUser: ctrl.userItem});
        }

        //
        // Private methods
        //

        function onSearchFinishedHandler(event, data) {
            if (angular.isUndefined(data.userId)) {
                ctrl.isCollapsed = !data.isItemPostsShown;
            } else if (data.userId === ctrl.userItem.id) {
                ctrl.isCollapsed = !data.isItemPostsShown;
            }

        }
    }
}());
