(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController',NewWidgetController);

    function NewWidgetController($routeParams, currentUser, $location, WidgetService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;
        model.websiteId=$routeParams['wid'];
        model.pageId=$routeParams['pid'];

        //event handlers
        model.createHeading=createHeading;
        model.createhtml=createhtml;
        model.createImage=createImage;
        model.createYouTube=createYouTube;
        model.createText=createText;

        function createHeading() {
            var heading={
                type:"HEADING",
                size:1,
                text:""
            };
            WidgetService
                .createWidget(model.pageId, heading)
                .then(redirect, errorWidget);
        }

        function createText() {
            var text={
                type:"TEXT",
                text:"",
                rows:0,
                placeholder:"",
                formatted:false
            };
            WidgetService
                .createWidget(model.pageId, text)
                .then(redirect, errorWidget);
        }

        function redirect(wdgt) {
            $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+wdgt._id);
        }

        function errorWidget() {
            model.message='Error ocuured. Try again later';
        }

        function createhtml() {
            var html={
                type:"HTML",
                text:""
            };
            WidgetService
                .createWidget(model.pageId, html)
                .then(redirect, errorWidget);
        }

        function createImage() {
            var image={
                type:"IMAGE",
                width:"100%",
                url:""
            };
            WidgetService
                .createWidget(model.pageId, image)
                .then(redirect, errorWidget);
        }

        function createYouTube() {
            var youtube={
                type:"YOUTUBE",
                width:"100%",
                url:""
            };
            WidgetService
                .createWidget(model.pageId, youtube)
                .then(redirect, errorWidget);
        }
    }
})();