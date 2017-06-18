(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location,userService) {
        var model=this;

        //event handlers
        model.register = register;


        function register(username, password, password1) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username field is required";
                return;
            }
            else if (password === null || password === '' || typeof password === 'undefined') {
                model.error = "Password field is required";
                return;
            }
            else if (password !== password1) {
                model.error = "Passwords should match";
                return;
            }
            else {
                userService
                    .findUserByUsername(username)
                    .then(renderUser, errorFindUser);
            }

            function renderUser(user) {
                if(user === null) {
                    var newuser = {
                        username: username,
                        password: password
                    };
                    userService
                        .register(newuser)
                        .then(redirectUser, errorUser);
                }
                else
                {
                    model.error = "Sorry! Username  is already taken";
                    return;
                }
            }

            function errorFindUser() {
                model.error = "Error occured. Try again later!";
                return;
            }
        }

        function redirectUser(user) {
            $location.url('/profile');
        }

        function errorUser(user) {
            model.message='Could not register user';
        }
    }

})();