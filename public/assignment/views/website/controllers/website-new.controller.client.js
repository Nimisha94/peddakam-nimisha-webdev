(function(){
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController',NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var model=this;
        model.userId=$routeParams['uid'];
        //model.websites=WebsiteService.findWebsitesByUser(model.userId);
        WebsiteService
            .findWebsitesByUser(model.userId)
            .then(renderWebsites, errorWebsite);

        //event handlers
        model.create=create;
        
        function create(name, description) {
            if(name === ''||name === null||typeof name ==='undefined')
            {
                model.message='Website name should be given';
                return;
            }
            var newWebsite={
                name:name,
                description:description
            }
            //WebsiteService.createWebsite(model.userId, newWebsite);
            WebsiteService
                .createWebsite(model.userId, newWebsite)
                .then(renderWebsite, errorWebsite);
        }

        function renderWebsites(websites) {
            model.websites=websites;
        }

        function renderWebsite() {
            $location.url('/user/'+model.userId+'/website');
        }

        function errorWebsite() {
            model.message='Error occured. Try again later';
        }
    }
})();