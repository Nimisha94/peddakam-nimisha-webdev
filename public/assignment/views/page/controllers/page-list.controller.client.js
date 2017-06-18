(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController',PageListController);

    function PageListController($routeParams, currentUser, PageService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;
        model.websiteId=$routeParams['wid'];
        //model.pages=PageService.findPageByWebsiteId(model.websiteId);

        function init() {
            PageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages, errorPage);
        }

        init();

        function renderPages(pages) {
            model.pages=pages;
        }

        function errorPage() {
            model.message='Error occured. Try again later.'
        }
    }
})();