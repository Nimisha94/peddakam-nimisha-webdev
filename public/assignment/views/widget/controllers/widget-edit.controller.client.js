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
        model.widget=WidgetService.findWidgetById(model.widgetId);
        model.name=model.widget.widgetType;
        model.text=model.widget.text;
        model.size=model.widget.size;
        model.url=model.widget.url;
        model.width=model.widget.width;

        //event handlers
        model.editHeading=editHeading;
        model.deleteHeading=deleteHeading;
        model.editImage=editImage;
        model.deleteImage=deleteImage;
        model.editYouTube=editYouTube;
        model.deleteYouTube=deleteYouTube;

        function editHeading() {
            var wdgt={
                    _id:model.widget._id,
                    widgetType:model.name,
                    pageId:model.widget.pageId,
                    text:model.text,
                    size:model.size
            };
            WidgetService.updateWidget(model.widgetId,wdgt);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteHeading() {
            WidgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
        
        function editImage() {
            var wdImage={
                _id:model.widget._id,
                widgetType:model.name,
                pageId:model.widget.pageId,
                width:model.width,
                url:model.url
            };
            WidgetService.updateWidget(model.widgetId,wdImage);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteImage() {
            WidgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function editYouTube() {
            var youtube={
                _id: (new Date().getTime())+"",
                widgetType:model.name,
                pageId:model.pageId,
                width:model.width,
                url:model.url
            };
            WidgetService.updateWidget(model.widgetId,youtube);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteYouTube() {
            WidgetService.deleteWidget(model.widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }
})();