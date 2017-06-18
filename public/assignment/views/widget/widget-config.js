(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller:'WidgetListController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller:'NewWidgetController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid/widget/:wgid',{
                templateUrl:'views/widget/templates/widget-edit.view.client.html',
                controller:'EditWidgetController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid/widget/:wgid/search',{
                templateUrl:'views/widget/templates/widget-flickr-search.view.client.html',
                controller:'FlickrImageSearchController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            });
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred=$q.defer();
        userService
            .loggedIn()
            .then(function (user) {
                if(user==='0')
                {
                    deferred.reject();
                    $location.url('/login');
                }
                else
                {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();