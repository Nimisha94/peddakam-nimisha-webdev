(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController',NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.pageId=$routeParams['pid'];

        //event handlers
        model.createHeading=createHeading;
        model.createhtml=createhtml;
        model.createImage=createImage;
        model.createYouTube=createYouTube;

        function createHeading() {
            var heading={
                widgetType:"HEADING",
                size:1,
                text:""
            };
            WidgetService
                .createWidget(model.pageId, heading)
                .then(redirect, errorWidget);
        }

        function redirect(wdgt) {
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+wdgt._id);
        }

        function errorWidget() {
            model.message='Error ocuured. Try again later';
        }

        function createhtml() {
            var html={
                widgetType:"HTML",
                text:""
            };
            WidgetService
                .createWidget(model.pageId, html)
                .then(redirect, errorWidget);
        }

        function createImage() {
            var image={
                widgetType:"IMAGE",
                width:"100%",
                url:""
            };
            WidgetService
                .createWidget(model.pageId, image)
                .then(redirect, errorWidget);
        }

        function createYouTube() {
            var youtube={
                widgetType:"YOUTUBE",
                width:"100%",
                url:""
            };
            WidgetService
                .createWidget(model.pageId, youtube)
                .then(redirect, errorWidget);
        }
    }
})();