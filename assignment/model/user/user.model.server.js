var userSchema=require('./user.schema.server');
var mongoose=require('mongoose');
var userModel=mongoose.model('UserModel', userSchema);


userModel.createUser=createUser;
userModel.findUserById=findUserById;
userModel.findUserByUsername=findUserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.updateUser=updateUser;
userModel.deleteUser=deleteUser;
userModel.addWebsite=addWebsite;
userModel.deleteWebsite=deleteWebsite;
userModel.findUserByGoogleId=findUserByGoogleId;

module.exports=userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id':googleId});
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    delete newUser.dateCreated;
    return userModel.update({_id:userId},{$set:newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id:userId});
}

