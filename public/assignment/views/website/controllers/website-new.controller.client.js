(function(){
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController',NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.websites=WebsiteService.findWebsitesByUser(model.userId);
        
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
            WebsiteService.createWebsite(model.userId, newWebsite);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();