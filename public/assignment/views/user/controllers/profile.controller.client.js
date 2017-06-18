(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, currentUser, userService) {
        var model=this;
        //model.userId=$routeParams['uid'];
        model.userId=currentUser._id;

        function init() {
           /* userService
                .findUserById(model.userId)
                .then(renderUser, userError);*/
           renderUser(currentUser);
        }

        init();

        //event handlers
        model.update=update;
        model.logout=logout;
        
        function update() {
            var usr={
                _id:model.user._id,
                username:model.user.username,
                password:model.user.password,
                firstName:model.user.firstName,
                lastName:model.user.lastName,
                email:model.user.email
            };
            userService
                .updateUser(model.userId,usr)
                .then(userUpdateSuccessful, userUpdateError);
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }
        
        function renderUser (user) {
            if(user) {
                model.user = user;
            }
            else
            {
                model.message = "User not found";
            }
        }

        function userError(error) {
            model.message = "Error occured. Try again later.";
        }

        function userUpdateSuccessful() {
            model.message="User has been updated successfully!"
        }

        function userUpdateError() {
            model.message="User could not be updated";
        }
    }
})();