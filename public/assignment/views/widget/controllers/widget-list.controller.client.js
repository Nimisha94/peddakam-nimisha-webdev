(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController',WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.pageId=$routeParams['pid'];
        model.widgetId=$routeParams['wgid'];

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets, errorWidget);
        }

        init();

        //event handlers
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function renderWidgets(widgets) {
            model.widgets=widgets;
        }

        function errorWidget() {
            model.message='Error occured. Try again later';
        }

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();