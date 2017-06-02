(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);
    
    function userService($http) {
        var users=
            [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];

        var api={
            findUserById:findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            updateUser:updateUser,
            deleteUser:deleteUser
        };

        return api;
        
        function deleteUser(userId) {
            /*var user=findUserById(userId);
            var ind=users.indexOf(user);
            users.splice(ind);*/
            var url='/api/user/'+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function updateUser(userId, user) {
            var url='/api/user/'+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function createUser(user) {
            user._id=(new Date().getTime()) + "";
            users.push(user);
            return user;
        }
        
        function findUserByUsername(username) {
            for(var u in users)
            {
                if(users[u].username===username)
                {
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            /*for(var u in users)
            {
                if(users[u]._id===userId)
                {
                    return users[u];
                }
            }
            return null;*/
            var url = "/api/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var found=null;
            for(var u in users)
            {
                if(users[u].username===username && users[u].password===password)
                {
                    return users[u];
                }
            }
            return null;
        }
    }
})();