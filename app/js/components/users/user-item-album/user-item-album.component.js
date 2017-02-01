(function() {
    'use strict';

    angular.module('testTask')
        .component('ttUserItemAlbum', {
            bindings: {
                albumItem: '<',
                userName: '<'
            },
            templateUrl: 'js/components/users/user-item-album/user-item-album.tpl.html',
            controller: TtUserItemAlbumController
        });

    function TtUserItemAlbumController() {
        var ctrl = this;
    }
}
());
