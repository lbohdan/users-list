(function() {
    'use strict';

    angular.module('testTask')
        .component('ttUserItemPosts', {
            bindings: {
                albumsList: '<',
                postsList: '<',
                userName: '<'
            },
            templateUrl: 'js/components/users/user-item-posts/user-item-posts.tpl.html',
            controller: TtUserItemPostsController
        });

    function TtUserItemPostsController($scope, lodash, ngDialog) {
        var ctrl = this;

        ctrl.showAlbumDetails = showAlbumDetails;

        //
        // Public methods
        //

        /**
         * Opens popup window with album details
         * @param {string} albumId
         */
        function showAlbumDetails(albumId) {
            ctrl.albumItem = lodash.find(ctrl.albumsList, {'id': albumId});
            ngDialog.open({
                template: '<tt-user-item-album data-album-item="ngDialogData.albumItem" ' +
                'data-user-name="ngDialogData.userName" class="tt-albums-popup"></tt-user-item-album>',
                plain: true,
                scope: $scope,
                data: {
                    albumItem: ctrl.albumItem,
                    userName: ctrl.userName

                },
                className: 'ngdialog-theme-default ngdialog-theme-tt'
            });
        }
    }
}());
