(function () {
    'use strict';

    angular.module('testTask')
        .component('ttUsersChart', {
            bindings: {
                usersList: '<'
            },
            templateUrl: 'js/components/users/users-chart/users-chart.tpl.html',
            controller: TtUsersChartController
        });

    function TtUsersChartController(lodash) {
        var ctrl = this;

        ctrl.$onInit = onInit;

        //
        // Hook methods
        //

        /**
         * Initialization method
         */
        function onInit() {
            ctrl.chartConfig = {
                options: {
                    chart: {
                        type: 'column',
                        height: '300'
                    },
                    colors: [
                        '#0c98cf',
                        '#f59a26'
                    ],
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
                        }
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: null
                        }
                    }
                },
                series: [
                    {
                        name: 'Posts',
                        data: lodash.map(ctrl.usersList, function(user) {
                            return user.rels.postsList.length;
                        })
                    },
                    {
                        name: 'ALbums Used',
                        data: lodash.map(ctrl.usersList, function(user) {
                            var albumsUsed = 0;

                            // Here we`re calculating an albums used q-ty (which are not empty)
                            // It`s made for better looking chart results on UI,
                            // cause server always returns the same total albums q-ty
                            lodash.forEach(user.rels.albumsList, function(album) {
                                if (lodash.get(album, 'rels.posts', []).length) {
                                    albumsUsed++;
                                }
                            });

                            return albumsUsed;
                        })
                    }
                ],
                title: {
                    text: null
                },

                xAxis: {
                    categories: lodash.map(ctrl.usersList, function(user) {
                        return user.name;
                    })
                },

                loading: false
            }
        }
    }
}());
