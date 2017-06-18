(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/login',{
                templateUrl:'views/user/templates/login.view.client.html',
                controller:'LoginController',
                controllerAs: 'model'
            })
            .when('/register',{
                templateUrl:'views/user/templates/register.view.client.html',
                controller:'RegisterController',
                controllerAs:'model'
            })
            .when('/profile',{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:'ProfileController',
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