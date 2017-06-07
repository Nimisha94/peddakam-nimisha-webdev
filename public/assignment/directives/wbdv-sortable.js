/**
 * Created by Nimisha on 05-06-2017.
 */

(function () {
    angular
        .module('WebAppMaker')
        .directive('wdDraggable', wdDraggable);

    function wdDraggable($http, $routeParams, WidgetService){

        function linkFunction(scope, element) {
            var start = null;
            var stop = null;
            $(element).sortable({
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui)
                {
                    stop = ui.item.index();
                    var pgid =$routeParams['pid'];
                    WidgetService.reorderWidget(start, stop, pgid)
                        .then(function (response) {
                        })
                }
            });
        }
        return {
            link: linkFunction
        }
    }


})()