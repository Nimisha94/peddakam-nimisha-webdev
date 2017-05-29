(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, userService) {
        var model=this;
        model.userId=$routeParams['uid'];
        model.user=userService.findUserById(model.userId);
    }
})();