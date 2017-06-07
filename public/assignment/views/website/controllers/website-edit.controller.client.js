(function(){
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController',EditWebsiteController);
    
    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];

        function init() {
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites,errorWebsite);

            WebsiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite, errorWebsite);
        }

        init();

        //event handlers
        model.deleteWebsite=deleteWebsite;
        model.updateWebsite=updateWebsite;
        
        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(model.websiteId)
                .then(redirectWebsite, errorWebsite);
        }

        function renderWebsites(websites) {
            model.websites=websites;
        }

        function renderWebsite(website) {
            if(website)
            {
                model.website=website;
            }
            else
            {
                model.message='Could not get the website. Try again later';
            }
        }

        function updateWebsite() {
            WebsiteService
                .updateWebsite(model.websiteId,model.website)
                .then(redirectWebsite, errorWebsite);
        }

        function redirectWebsite() {
            $location.url('/user/'+model.userId+'/website');
        }

        function errorWebsite() {
            model.message='Error occured. Try again later';
        }
        
    }
})();