(function(){
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController',EditWebsiteController);
    
    function EditWebsiteController($routeParams, currentUser, $location, WebsiteService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;
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
                .deleteWebsite(model.userId,model.websiteId)
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
            if(model.website.name === ''||model.website.name === null||typeof model.website.name ==='undefined')
            {
                model.message='Website name should be given';
                return;
            }
            else {
                WebsiteService
                    .updateWebsite(model.websiteId, model.website)
                    .then(redirectWebsite, errorWebsite);
            }
        }

        function redirectWebsite() {
            $location.url('/website');
        }

        function errorWebsite() {
            model.message='Error occured. Try again later';
        }
        
    }
})();