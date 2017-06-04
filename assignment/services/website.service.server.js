var app=require('../../express');

var websites=
    [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite)

function createWebsite(req, res) {
    var website=req.body;
    var userId=req.params.userId;
    website._id=(new Date().getTime())+"";
    website.developerId=userId;
    website.created=new Date();
    website.accessed=new Date();
    websites.push(website);
    res.sendStatus(200);
}

function findAllWebsitesForUser(req, res) {
    var userId=req.params.userId;
    var userWebsites=[];
    for(var w in websites)
    {
        if(websites[w].developerId === userId)
        {
            websites[w].created=new Date();
            websites[w].accessed=new Date();
            userWebsites.push(websites[w]);
        }
    }
    res.json(userWebsites);
}

function findWebsiteById(req, res) {
    var websiteId=req.params.websiteId;
    for(var w in websites)
    {
        if(websites[w]._id === websiteId)
        {
            res.json(websites[w]);
            return;
        }
    }
    res.json(null);
}

function updateWebsite(req, res) {
    var websiteId=req.params.websiteId;
    var website=req.body;
    for(var w in websites)
    {
        if(websites[w]._id === websiteId)
        {
            websites[w]=website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var websiteId=req.params.websiteId;
    var index=null;
    for(var w in websites)
    {
        if(websites[w]._id === websiteId)
        {
            index=w;
        }
    }
    if(index !== null)
    {
        websites.splice(index,1);
        res.sendStatus(200);
    }
    else
    {
        res.sendStatus(404);
    }
}