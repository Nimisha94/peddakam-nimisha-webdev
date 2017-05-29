(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location,userService) {
        var model=this;
        model.register = register;


        function register(username, password, password1) {
            if(username === null || username === ''||typeof username === 'undefined')
            {
                model.error = "Username field is required";
                return;
            }
            else if(password === null ||password === '' || typeof password ==='undefined')
            {
                model.error = "Password field is required";
                return;
            }
            else if(password!==password1) {
               model.error = "Passwords should match";
               return;
           }
           else {
                var user = userService.findUserByUsername(username);
                if(user === null)
                {
                    var newuser = {
                        username: username,
                        password: password
                    };
                    var usr = userService.createUser(newuser);
                    $location.url('/user/' + usr._id);

                }
                else {
                    model.error = "Sorry! Username " + username + " is already taken";
                    return;
                }
            }
        }
    }

})();