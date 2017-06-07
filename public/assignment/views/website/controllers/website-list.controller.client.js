(function(){
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController',WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model=this;
        model.userId=$routeParams['uid'];

        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites, errorWebsites);
        }

        init();

        function renderWebsites(websites) {
            model.websites=websites;
        }

        function errorWebsites() {
            model.message='Error occured. Try again later';
        }
    }
})();