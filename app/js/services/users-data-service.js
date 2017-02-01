(function () {
    'use strict';

    angular.module('testTask')
        .factory('UsersDataService', UsersDataService);

    function UsersDataService($q, lodash, Restangular) {
        return {
            albums: getUserAlbums,
            posts: getUserPosts,
            resolver: resolver,
            users: getUsers
        };

        //
        // Public methods
        //

        /**
         * Retrieves albums from back-end for one user
         * @param {string} userId
         * @returns {Promise} an array of albums
         */
        function getUserAlbums(userId) {
            return Restangular.one('user', userId).all('albums').getList();
        }

        /**
         * Retrieves all existing users from back-end
         * @returns {Promise} an array of users
         */
        function getUsers() {
            return Restangular.all('users').getList();
        }

        /**
         * Retrieves posts from back-end for one user
         * @param {string} userId
         * @returns {Promise} an array of posts
         */
        function getUserPosts(userId) {
            return Restangular.one('user', userId).all('posts').getList();
        }


        /**
         * Resolver for getting data from back-end
         */
        function resolver() {
            var usersData;
            return getUsers()
                .then(function (users) {
                    var promisesArray = [];
                    usersData = users.plain();
                    angular.forEach(usersData, function (user) {
                        promisesArray.push($q.all([getUserAlbums(user.id), getUserPosts(user.id)]));
                    });

                    return $q.all(promisesArray);
                })
                .then(function (resultArray) {
                    angular.forEach(usersData, function (user, index) {
                        var albumsList = resultArray[index][0].plain();
                        var postsList = resultArray[index][1].plain();

                        setAlbumsPostsRelations(albumsList, postsList);

                        // remove albums without relations
                        albumsList = lodash.pickBy(albumsList, function (album) {
                            return lodash.has(album, 'rels');
                        });
                        albumsList = lodash.map(albumsList, function (album) {
                            return album;
                        });

                        // bind albums and posts with user
                        lodash.assign(user, {
                            rels: {
                                albumsList: albumsList,
                                postsList: postsList
                            }
                        });
                    });

                    return usersData;
                })
                .catch(function (error) {
                    console.log('Error while getting data: ', error);
                });
        }

        //
        // Private methods
        //

        /**
         * Randomly sets relationships between albums and posts for one user
         * @param {Array} albums
         * @param {Array} posts
         */
        function setAlbumsPostsRelations(albums, posts) {
            angular.forEach(posts, function (post) {
                var randomAlbum = albums[lodash.random(0, albums.length - 1)];

                // Set property to be used for search results displaying
                post.isItemFitQuery = true;

                lodash.assign(post, {
                    isVisible: true,
                    rels: {
                        album: randomAlbum
                    }
                });

                lodash.defaultsDeep(randomAlbum, {
                    rels: {
                        posts: []
                    }
                });
                randomAlbum.rels.posts.push(post);
            });
        }
    }
}());
