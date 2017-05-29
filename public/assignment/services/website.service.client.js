(function(){
    angular
        .module('WebAppMaker')
        .factory('WebsiteService',WebsiteService);

    function WebsiteService(){
        var websites=
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];


        var api={
            createWebsite:createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        
        return api;

        function createWebsite(userId,website) {
            website._id=(new Date().getTime())+"";
            website.developerId=userId;
            website.created=new Date();
            websiteaccessed=new Date();
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var userWebsites=[];
            for(var w in websites)
            {
                if(websites[w].developerId === userId)
                {
                    websites[w].created=new Date();
                    websites[w].accessed=new Date();
                    userWebsites.push(websites[w]);
                }
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites)
            {
                if(websites[w]._id === websiteId)
                {
                    return websites[w];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var wsite = findWebsiteById(websiteId);
            var ind = websites.indexOf(wsite);
            websites[ind]=website;
        }
        
        function deleteWebsite(websiteId) {
            var website=findWebsiteById(websiteId);
            var ind=websites.indexOf(website);
            websites.splice(ind,1);
        }
    }
})();