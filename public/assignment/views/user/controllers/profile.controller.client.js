(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, userService) {
        var model=this;
        model.userId=$routeParams['uid'];

        userService
            .findUserById(model.userId)
            .then(renderUser, userError);
        //model.user=userService.findUserById(model.userId);

        //event handlers
        model.update=update;
        
        function update() {
            var usr={
                _id:model.user._id,
                username:model.user.username,
                password:model.user.password,
                firstName:model.user.firstName,
                lastName:model.user.lastName
            };
            userService
                .updateUser(model.userId,usr)
                .then(userUpdateSuccessful, userUpdateError);
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.message = "User not found";
        }

        function userUpdateSuccessful() {
            model.message="User has been updated successfully!"
        }

        function userUpdateError() {
            model.message="User could not be updated";
        }
    }
})();