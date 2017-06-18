(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController',EditPageController);

    function EditPageController($routeParams, currentUser, $location, PageService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;
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
                .deletePage(model.websiteId,model.pageId)
                .then(redirectDelete, errorPage);
        }

        function redirectDelete() {
            $location.url('/website/'+model.websiteId+'/page');
        }

        function updatePage() {
            if(model.page.name===''||model.page.name===null || typeof model.page.name==='undefined')
            {
                model.message='Page Name should be given';
                return;
            }
            PageService
                .updatePage(model.pageId, model.page)
                .then(redirectPage, errorPage);
        }

        function redirectPage() {
            $location.url('/website/'+model.websiteId+'/page');
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