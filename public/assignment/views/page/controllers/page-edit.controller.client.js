(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController',EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.pageId=$routeParams['pid'];
        model.pages=PageService.findPageByWebsiteId(model.websiteId);
        model.page=PageService.findPageById(model.pageId);

        //event handlers
        model.deletePage=deletePage;

        function deletePage() {
            PageService.deletePage(model.pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();