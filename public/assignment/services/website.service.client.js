(function(){
    angular
        .module('WebAppMaker')
        .factory('WebsiteService',WebsiteService);

    function WebsiteService($http){
        /*var websites=
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];*/


        var api={
            createWebsite:createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        
        return api;

        function createWebsite(userId,website) {
            /*website._id=(new Date().getTime())+"";
            website.developerId=userId;
            website.created=new Date();
            website.accessed=new Date();
            websites.push(website);*/
            var url='/api/user/'+userId+'/website';
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsitesByUser(userId) {
            /*var userWebsites=[];
            for(var w in websites)
            {
                if(websites[w].developerId === userId)
                {
                    websites[w].created=new Date();
                    websites[w].accessed=new Date();
                    userWebsites.push(websites[w]);
                }
            }
            return userWebsites;*/
            var url='/api/user/'+userId+'/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsiteById(websiteId) {
            /*for(var w in websites)
            {
                if(websites[w]._id === websiteId)
                {
                    return websites[w];
                }
            }
            return null;*/
            var url='/api/website/'+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWebsite(websiteId, website) {
            /*var wsite = findWebsiteById(websiteId);
            var ind = websites.indexOf(wsite);
            websites[ind]=website;*/
            var url='/api/website/'+websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function deleteWebsite(websiteId) {
            /*var website=findWebsiteById(websiteId);
            var ind=websites.indexOf(website);
            websites.splice(ind,1);*/
            var url='/api/website/'+websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();