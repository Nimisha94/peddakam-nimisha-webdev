(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController',EditWidgetController);

    function EditWidgetController($routeParams, $location, currentUser, WidgetService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;
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
            if(model.text===''||typeof model.text==='undefined')
            {
                model.message='Text is required';
            }
            else {
                var wdgt = {
                    _id: model.widget._id,
                    type: model.name,
                    _page: model.widget._page,
                    text: model.text,
                    size: model.size
                };
                WidgetService
                    .updateWidget(model.widgetId, wdgt)
                    .then(redirectWidget, errorWidget);
            }
        }

        function editHtml() {
            if(model.text===''||typeof model.text==='undefined')
            {
                model.message='Text is required';
            }
            else {
                var wdgthtml = {
                    _id: model.widget._id,
                    type: model.name,
                    _page: model.widget._page,
                    text: model.text,
                    size: model.size
                };
                WidgetService
                    .updateWidget(model.widgetId, wdgthtml)
                    .then(redirectWidget, errorWidget);
            }
        }

        function editText() {
            if(model.text===''||typeof model.text==='undefined')
            {
                model.message='Text is required';
            }
            else {
                var wdgttext = {
                    _id: model.widget._id,
                    type: model.name,
                    _page: model.widget._page,
                    text: model.text,
                    rows: model.rows,
                    placeholder: model.placeholder,
                    formatted: model.formatted
                };
                WidgetService
                    .updateWidget(model.widgetId, wdgttext)
                    .then(redirectWidget, errorWidget);
            }
        }

        function editImage() {
            if(model.url===''||typeof model.url==='undefined')
            {
                model.message='URL is required';
            }
            else {
                var wdImage = {
                    _id: model.widget._id,
                    type: model.name,
                    _page: model.widget._page,
                    width: model.width,
                    url: model.url
                };
                WidgetService
                    .updateWidget(model.widgetId, wdImage)
                    .then(redirectWidget, errorWidget);
            }
        }

        function editYouTube() {
            if(model.url===''||typeof model.url==='undefined')
            {
                model.message='URL is required';
            }
            else {
                var youtube = {
                    _id: model.widget._id,
                    type: model.name,
                    _page: model._page,
                    width: model.width,
                    url: model.url
                };
                WidgetService
                    .updateWidget(model.widgetId, youtube)
                    .then(redirectWidget, errorWidget);
            }
        }

        function redirectWidget() {
            $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(redirectWidget, errorWidget);
        }

    }
})();