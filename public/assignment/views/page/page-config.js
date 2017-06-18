(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/website/:wid/page',{
                templateUrl:'views/page/templates/page-list.view.client.html',
                controller:'PageListController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller:'NewPageController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller:'EditPageController',
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