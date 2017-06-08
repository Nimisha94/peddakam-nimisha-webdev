(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/templates/home.html',
                controller: 'HomeController',
                controllerAs: 'model'
            })
            .when('/search/:searchText', {
                templateUrl: 'views/series/templates/search-results.view.client.html',
                controller: 'SearchController',
                controllerAs: 'model'
            })
            .when('/search/:searchText/:seriesId/details', {
                templateUrl: 'views/series/templates/search-results-details.view.client.html',
                controller: 'SearchDetailsController',
                controllerAs: 'model'
            })
    }
}) ();
