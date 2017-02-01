(function () {
    'use strict';

    angular.module('testTask')
        .component('ttSearchPosts', {
            bindings: {
                selectedUser: '<',
                usersList: '<'
            },
            templateUrl: 'js/components/users/search-posts/search-posts.tpl.html',
            controller: TtSearchPostsController
        });

    function TtSearchPostsController($element, $rootScope, lodash) {
        var ctrl = this;
        var searchInput;

        ctrl.$onDestroy = onDestroy;
        ctrl.$postLink = postLink;

        ctrl.makeSearch = makeSearch;

        //
        // Hook methods
        //

        /**
         * Destructor method
         */
        function onDestroy() {
            searchInput.off('keydown keypress', blurOnEnter);
        }

        /**
         * Post linking method
         */
        function postLink() {
            searchInput = $element.find('#searchInput');
            searchInput.on('keydown keypress', blurOnEnter);
        }


        //
        // Public methods
        //

        /**
         * Performs posts search
         */
        function makeSearch() {
            if (ctrl.searchQuery) {
                if (ctrl.selectedUser !== null) {
                    resetSearch();

                    // Filter search results
                    angular.forEach(ctrl.selectedUser.rels.postsList, function (post) {
                        post.isItemFitQuery = lodash.includes(post.title, ctrl.searchQuery) || lodash.includes(post.body, ctrl.searchQuery);
                    });

                    $rootScope.$broadcast('search-posts_make-search', {
                        isItemPostsShown: true,
                        userId: ctrl.selectedUser.id
                    });
                } else {
                    var posts = lodash.chain(ctrl.usersList)
                        .map(function (userItem) {
                            return lodash.get(userItem, 'rels.postsList');
                        })
                        .flatten()
                        .value();

                    // Filter search results
                    angular.forEach(posts, function (post) {
                        post.isItemFitQuery = lodash.includes(post.title, ctrl.searchQuery) || lodash.includes(post.body, ctrl.searchQuery);
                    });

                    $rootScope.$broadcast('search-posts_make-search', {isItemPostsShown: true});
                }
            } else {
                resetSearch();
            }
        }

        //
        // Private methods
        //

        /**
         * Triggers input blur on enter keypress
         */
        function blurOnEnter(event) {
            if (event.which === 13) {
                this.blur();
            }
        }

        /**
         * Makes all posts visible again
         */
        function resetSearch() {
            var posts = lodash.chain(ctrl.usersList)
                .map(function (userItem) {
                    return lodash.get(userItem, 'rels.postsList');
                })
                .flatten()
                .value();

            angular.forEach(posts, function (post) {
                post.isItemFitQuery = true;
            });

            $rootScope.$broadcast('search-posts_make-search', {isItemPostsShown: false});
        }
    }
}());
