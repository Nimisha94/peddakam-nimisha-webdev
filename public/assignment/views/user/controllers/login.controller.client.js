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
            //var found=userService.findUserByCredentials(username, password);
            userService
                .findUserByCredentials(username,password)
                .then(redirect,errorUser);
        }

        function redirect(user){
            if(user === null)
            {
                model.message='Invalid credentials';
            }
            else {
                $location.url('/user/' + user._id);
                // $scope.message='welcome '+users[u].username;
            }
        }

        function errorUser() {
            model.message='Error occured. Try again later';
        }
    }
})();