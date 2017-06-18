(function(){
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController',NewWebsiteController);

    function NewWebsiteController($routeParams, currentUser, $location, WebsiteService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;

        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites, errorWebsite);
        }

        init();

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
            WebsiteService
                .createWebsite(model.userId, newWebsite)
                .then(renderWebsite, errorWebsite);
        }

        function renderWebsites(websites) {
            model.websites=websites;
        }

        function renderWebsite() {
            $location.url('/website');
        }

        function errorWebsite() {
            model.message='Error occured. Try again later';
        }
    }
})();