(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, userService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.user=userService.findUserById(model.userId);

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
            userService.updateUser(model.userId,usr);
        }
    }
})();