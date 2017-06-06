(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController',EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.pageId=$routeParams['pid'];
        model.widgetId=$routeParams['wgid'];
        //model.widget=WidgetService.findWidgetById(model.widgetId);
        WidgetService
            .findWidgetById(model.widgetId)
            .then(renderWidget, errorWidget);


        //event handlers
        model.editHeading=editHeading;
        model.deleteWidget=deleteWidget;
        model.editImage=editImage;
        model.editYouTube=editYouTube;

        function renderWidget(widget) {
            model.widget=widget;
            model.name=model.widget.widgetType;
            model.text=model.widget.text;
            model.size=model.widget.size;
            model.url=model.widget.url;
            model.width=model.widget.width;
        }

        function errorWidget() {
            model.message='Error occured. Try again later';
        }

        function editHeading() {
            var wdgt={
                    _id:model.widget._id,
                    widgetType:model.name,
                    pageId:model.widget.pageId,
                    text:model.text,
                    size:model.size
            };
            WidgetService
                .updateWidget(model.widgetId,wdgt)
                .then(redirectWidget, errorWidget);
        }

        function editImage() {
            var wdImage={
                _id:model.widget._id,
                widgetType:model.name,
                pageId:model.widget.pageId,
                width:model.width,
                url:model.url
            };
            WidgetService
                .updateWidget(model.widgetId,wdImage)
                .then(redirectWidget, errorWidget);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function editYouTube() {
            var youtube={
                _id: model.widget._id,
                widgetType:model.name,
                pageId:model.pageId,
                width:model.width,
                url:model.url
            };
            WidgetService
                .updateWidget(model.widgetId,youtube)
                .then(redirectWidget, errorWidget);
           // $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function redirectWidget() {
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(model.widgetId)
                .then(redirectWidget, errorWidget);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

    }
})();