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

        function init() {
            WidgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget, errorWidget);
        }

        init();

        //event handlers
        model.editHeading=editHeading;
        model.deleteWidget=deleteWidget;
        model.editImage=editImage;
        model.editYouTube=editYouTube;
        model.editHtml=editHtml;
        model.editText=editText;

        function renderWidget(widget) {
            model.widget=widget;
            model.name=model.widget.type;
            model.text=model.widget.text;
            model.size=model.widget.size;
            model.url=model.widget.url;
            model.width=model.widget.width;
            model.rows=model.widget.rows;
            model.placeholder=model.widget.placeholder;
            model.formatted=model.widget.formatted;
        }

        function errorWidget() {
            model.message='Error occured. Try again later';
        }

        function editHeading() {
            var wdgt={
                    _id:model.widget._id,
                    type:model.name,
                    _page:model.widget._page,
                    text:model.text,
                    size:model.size
            };
            WidgetService
                .updateWidget(model.widgetId,wdgt)
                .then(redirectWidget, errorWidget);
        }

        function editHtml() {
            var wdgthtml={
                _id:model.widget._id,
                type:model.name,
                _page:model.widget._page,
                text:model.text,
                size: model.size
            };
            WidgetService
                .updateWidget(model.widgetId,wdgthtml)
                .then(redirectWidget, errorWidget);
        }

        function editText() {
            var wdgttext={
                _id:model.widget._id,
                type:model.name,
                _page:model.widget._page,
                text:model.text,
                rows:model.rows,
                placeholder:model.placeholder,
                formatted:model.formatted
            };
            WidgetService
                .updateWidget(model.widgetId,wdgttext)
                .then(redirectWidget, errorWidget);
        }

        function editImage() {
            var wdImage={
                _id:model.widget._id,
                type:model.name,
                _page:model.widget._page,
                width:model.width,
                url:model.url
            };
            WidgetService
                .updateWidget(model.widgetId,wdImage)
                .then(redirectWidget, errorWidget);
        }

        function editYouTube() {
            var youtube={
                _id: model.widget._id,
                type:model.name,
                _page:model._page,
                width:model.width,
                url:model.url
            };
            WidgetService
                .updateWidget(model.widgetId,youtube)
                .then(redirectWidget, errorWidget);
        }

        function redirectWidget() {
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(redirectWidget, errorWidget);
        }

    }
})();