(function () {
    'use strict';

    angular.module('testTask')
        .component('ttShowHideItem', {
            bindings: {
                isItemFitQuery: '<'
            },
            controller: TtShowHideItemController
        });

    function TtShowHideItemController($element) {
        var ctrl = this;

        ctrl.$onChanges = onChanges;

        //
        // Hook methods
        //

        /**
         * On bindings change handler
         * @param changes
         */
        function onChanges(changes) {
            if (angular.isDefined(changes.isItemFitQuery) && !changes.isItemFitQuery.isFirstChange()) {
                changeVisibility(changes.isItemFitQuery.currentValue);
            }
        }

        //
        // Private methods
        //

        /**
         * Method sets display property of element to false if it doesn't fit the query in search otherwise removes these property
         * @param {boolean} newValue - value displays if current element fit search query
         */
        function changeVisibility(newValue) {
            var displayValue = (newValue === false) ? 'none' : '';
            $element.css('display', displayValue);
        }
    }
}());
