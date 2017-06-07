(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {
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
        model.searchPhotos=searchPhotos;
        model.selectPhoto=selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }

        function selectPhoto(photo)
        {
            model.widget.url="https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_"+"s.jpg";
            WidgetService
                .updateWidget(model.widgetId, model.widget)
                .then(redirectWidget, errorWidget);

            function redirectWidget() {
                $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+model.widgetId);
            }
        }

        function renderWidget(widget)
        {
            model.widget=widget;
        }

        function errorWidget() {
            model.message='Error occured. Ty again later.';
        }

    }
})();