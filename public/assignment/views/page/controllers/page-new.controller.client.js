(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController',NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.pages=PageService.findPageByWebsiteId(model.websiteId);

        //event handlers
        model.create=create;

        function create(name, description) {
            if(name===''||name===null || typeof name==='undefined')
            {
                model.message='Page Name should be given';
                return;
            }
            var newPage={
                name:name,
                description:description
            };
            PageService.createPage(model.websiteId,newPage);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();