(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/website',{
                templateUrl:'views/website/templates/website-list.view.client.html',
                controller:'WebsiteListController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/new',{
                templateUrl:'views/website/templates/website-new.view.client.html',
                controller:'NewWebsiteController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid',{
                templateUrl:'views/website/templates/website-edit.view.client.html',
                controller:'EditWebsiteController',
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