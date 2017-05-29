(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location,userService) {
        var model=this;
        model.login = login;


        function login(username, password) {
            if(username==''||username===null||typeof username === 'undefined')
            {
                model.message='Username is required';
                return;
            }
            var found=userService.findUserByCredentials(username, password);
            if(found!==null)
            {
                $location.url('/user/'+found._id);
                // $scope.message='welcome '+users[u].username;
            }
            else
            {
                model.message='Invalid credentials';
            }
        }
    }

})();