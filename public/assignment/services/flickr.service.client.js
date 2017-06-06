(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService',FlickrService);

    function FlickrService($http) {

        this.searchPhotos=searchPhotos;


        var key = "de1b66d392d5a504ed4d576d423b9b8f";
        var secret = "a1d47dbf3fd20ee9";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


        function searchPhotos(searchTerm) {
        var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
        return $http.get(url);
    }

    }
})();