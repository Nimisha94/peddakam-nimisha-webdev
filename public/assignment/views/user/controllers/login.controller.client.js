(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location,userService) {
        var model=this;

        //event handlers
        model.login = login;


        function login(username, password) {
            if(username===''&&password==='')
            {
                model.message='Username and password are required';
                return;
            }
            else if(typeof username==='undefined'&&typeof password==='undefined')
            {
                model.message='Username and password are required';
                return;
            }
            else if(username==''||username===null||typeof username === 'undefined')
            {
                model.message='Username is required';
                return;
            }
            else if(password==''|| typeof username==='undefined')
            {
                model.message='Password is required';
                return;
            }
            else {
                userService
                    .login(username, password)
                    .then(redirect, errorUser);
            }
        }

        function redirect(user){
            if(user === null)
            {
                model.message='Invalid credentials';
            }
            else {
                $location.url('/profile');
            }
        }

        function errorUser() {
            model.message='Invalid credentials';
        }
    }
})();