(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController',EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.pageId=$routeParams['pid'];

        function init() {
            PageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages, errorPage);

            PageService
                .findPageById(model.pageId)
                .then(renderPage, errorPage);
        }

        init();

        //event handlers
        model.deletePage=deletePage;
        model.updatePage=updatePage;

        function deletePage() {
            PageService
                .deletePage(model.pageId)
                .then(redirectDelete, errorPage);
        }

        function redirectDelete() {
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function updatePage() {
            PageService
                .updatePage(model.pageId, model.page)
                .then(redirectPage, errorPage);
        }

        function redirectPage() {
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function renderPages(pages) {
            model.pages=pages;
        }

        function renderPage(page) {
            if(page)
            {
                model.page = page;
            }
            else
            {
                model.message='Could not find page. Try again later';
            }
        }

        function errorPage() {
            model.message='Error occured. Try again later';
        }
    }
})();