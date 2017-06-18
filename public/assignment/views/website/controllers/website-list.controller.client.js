(function(){
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController',WebsiteListController);

    function WebsiteListController($routeParams, currentUser, WebsiteService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;

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