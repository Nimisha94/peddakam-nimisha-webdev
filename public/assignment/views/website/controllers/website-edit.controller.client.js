(function(){
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController',EditWebsiteController);
    
    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websiteId=$routeParams['wid'];
        model.websites=WebsiteService.findWebsitesByUser(model.userId);
        model.website=WebsiteService.findWebsiteById(model.websiteId);
        //event handlers
        model.deleteWebsite=deleteWebsite;
        model.updateWebsite=updateWebsite;
        
        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

        function updateWebsite() {
            WebsiteService.updateWebsite(model.websiteId,model.website);
            $location.url('#!/user/'+model.userId+'/website');
        }
        
    }
})();