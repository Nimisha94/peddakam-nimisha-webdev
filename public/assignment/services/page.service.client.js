(function () {
    angular
        .module('WebAppMaker')
        .factory('PageService',PageService);
    
    function PageService($http) {
        /*var pages=
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];*/

        var api={
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };

        return api;

        function createPage(websiteId, page) {
           /* page._id=(new Date().getTime())+"";
            page.websiteId=websiteId;
            pages.push(page);*/
           var url='/api/website/'+websiteId+'/page';
           return $http.post(url, page)
               .then(function (response) {
                   return response.data;
               })
        }
        
        function findPageByWebsiteId(websiteId) {
            /*var page=[];
            for(var p in pages)
            {
                if(pages[p].websiteId === websiteId)
                {
                    pages[p].created=new Date();
                    pages[p].accessed=new Date();
                    page.push(pages[p]);
                }
            }
            return page;*/
            var url='/api/website/'+websiteId+'/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function findPageById(pageId) {
            /*for(var p in pages)
            {
                if(pages[p]._id === pageId)
                {
                    return pages[p];
                }
            }
            return null;*/
            var url='/api/page/'+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pageId, page) {
            /*var oldPage=findPageById(pageId);
            var ind=pages.indexOf(oldPage);
            pages[ind]=page;*/
            var url='/api/page/'+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePage(pageId) {
            /*var page=findPageById(pageId);
            var ind=pages.indexOf(page);
            pages.splice(ind,1);*/
            var url='/api/page/'+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();