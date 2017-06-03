var app=require('../../express');

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.get ('/api/user/:userId', findUserById);
app.put ('/api/user/:userId', updateUser);
app.get ('/api/user', findUser);
app.post ('/api/user', createUser);
app.delete ('/api/user/:userId', deleteUser);

function findUserById(req, res) {
    var userId = req.params['userId'];
    for(var u in users) {
        if(users[u]._id === userId) {
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateUser(req, res) {
    var user=req.body;
    for(var u in users)
    {
        if(users[u]._id===req.params.userId)
        {
            users[u]=user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var ind=null;
    for(var u in users)
    {
        if(users[u]._id===req.params.userId)
        {
            ind=u;
        }
    }
    if(ind!==null)
    {
        users.splice(u,1);
        res.sendStatus(200);
        return;
    }
    else
    {
        res.sendStatus(404);
    }
}

function createUser(req, res) {
    var user=req.body;
    user._id=(new Date().getTime()) + "";
    users.push(user);
    res.json(user);
}

function findUser(req, res) {
    var username=req.query.username;
    var password=req.query.password;
    if(password && username)
    {
        findUserByCredentials(req, res);
    }
    else if(username)
    {
        findUserByUsername(req, res);
    }
}

function findUserByCredentials(req, res) {
   var username=req.query.username;
   var password=req.query.password;
   for(var u in users)
    {
        if(users[u].username===username && users[u].password===password)
        {
            res.json(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserByUsername(req, res) {
    var username=req.query.username;
    for(var u in users)
    {
        if(users[u].username===username)
        {
            res.json(users[u]);
            return;
        }
    }
    res.json(null);
}