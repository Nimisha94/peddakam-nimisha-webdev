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
            //wdgt=WidgetService.createWidget(model.pageId,heading);
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
            //wdgt=WidgetService.createWidget(model.pageId,html);
            WidgetService
                .createWidget(model.pageId, html)
                .then(redirect, errorWidget);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+wdgt._id);
        }

        function createImage() {
            var image={
                widgetType:"IMAGE",
                width:"100%",
                url:""
            };
            //wdgt=WidgetService.createWidget(model.pageId,image);
            WidgetService
                .createWidget(model.pageId, image)
                .then(redirect, errorWidget);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+wdgt._id);
        }

        function createYouTube() {
            //{ "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            //"url": "https://youtu.be/AM2Ivdi9c4E" },
            var youtube={
                widgetType:"YOUTUBE",
                width:"100%",
                url:""
            };
            //wdgt=WidgetService.createWidget(model.pageId,youtube);
            WidgetService
                .createWidget(model.pageId, youtube)
                .then(redirect, errorWidget);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+wdgt._id);
        }
    }
})();