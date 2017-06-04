(function(){
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController',WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model=this;
        model.userId=$routeParams['uid'];
        //model.websites=WebsiteService.findWebsitesByUser(model.userId);
        WebsiteService
            .findWebsitesByUser(model.userId)
            .then(renderWebsites, errorWebsites);

        function renderWebsites(websites) {
            model.websites=websites;
        }

        function errorWebsites() {
            model.message='Error occured. Try again later';
        }
    }
})();