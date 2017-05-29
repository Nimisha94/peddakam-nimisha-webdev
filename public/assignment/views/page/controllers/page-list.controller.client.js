(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController',PageListController);

    function PageListController($routeParams, PageService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.pages=PageService.findPageByWebsiteId(model.websiteId);
    }
})();