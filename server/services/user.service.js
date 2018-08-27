var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var cloudinary = require('cloudinary');

var User  = require('../models').user;

var Comment  = require('../models').comments;

var  Posts = require('../models').posts;
var  Steps = require('../models').steps;

var index = require('../models/index');

cloudinary.config({ 
    cloud_name: 'howtodo', 
    api_key: '544156768387412', 
    api_secret: 'qsgBxIUX76VTB6mmxR2NJnCqIQA' 
});


var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.addComment = addComment;
service.getComment = getComment;
service.update = update;
service.blocking = blocking;
service.deleteAdmin = deleteAdmin;
service.unblock = unblock;
service.addAdmin = addAdmin;
service.delete = _delete;
service.getByName = getByName;
service.addPosts = addPosts;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    User.findOne({where:
        { username: username }})
        .then(function (user) {
        if (user && bcrypt.compareSync(password, user.password) && user.activated === 0) {
            // authentication successful
            deferred.resolve({
                id: user.id,
                username: user.username,
                email: user.email,
                activated: user.activated,
                admins: user.admins,
                token: jwt.sign({ sub: user.id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
        
    });
    // console.log(deferred.promise);

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();
    
    User.findAll({raw: true}).then(function(users){
        // projects will be an array of all Project instances
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
      });    

    return deferred.promise;
}

function getComment(postId, login) {
    var deferred = Q.defer();
    
    Comment.findAll({ where: { id: postId, userName: login, raw: true}}).then(function(users){
        // projects will be an array of all Project instances
        comment = _.map(comment, function (comment) {
            return _.omit(comment);
        });

        deferred.resolve(comment);
      });    

    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();
    console.log(id);

    User.findById(id)
    .then(function (user) {
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getByName(username) {
    var deferred = Q.defer();

    User.findOne({ where: {username: username} })
    .then(function (user) {
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam, activated) {
    var deferred = Q.defer();

    // validation
    User.findOne({where:
        { username: userParam.username }})
        .then(function (user) {

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        activated = 0;
        admins = 0;
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam,'password', 'admins', 'activated');
        user.activated = activated;      
        user.admins = admins;
        

        // add hashed password to user object
        user.password = bcrypt.hashSync(userParam.password, 10);

        User.create(user)
        .then(function (newUser, created) {
                
                if(!newUser){
                    deferred.reject(err.name + ': ' + err.message);
                    }
                    
                    if(newUser){
                    deferred.resolve();
                    }                
            });
    }
    return deferred.promise;
}


function addComment(comment) {
    var deferred = Q.defer();

    Comment.create(comment)
    .then(function (newComment, created) {
                
        if (!newComment){
            deferred.reject(err.name + ': ' + err.message);
        } else if (newComment){
            deferred.resolve();
        }                
    });
    
    return deferred.promise;
}

function addPosts(instruction) {
    var deferred = Q.defer();
    console.log("ani")
    var post = _.omit(instruction[0].name, instruction[0].categories,instruction[0].username , instruction[0].content, instruction.lenght - 1, 'url');
    // var steps = _.omit(userParam,'password', 'activated');

    cloudinary.uploader.upload(instruction[0].url, function(result) { 
        post.url = result.secure_url;
    });




    Posts.create(post)
    .then(function (newPost, created) {
                
        if (!newPost){
            deferred.reject(err.name + ': ' + err.message);
        } else if (newPost){
            deferred.resolve();
        }                
    });
    
    return deferred.promise;
}

function update(id, userParam) {
    var deferred = Q.defer();

    // validation
    User.findById(id)
    .then(function (user) {

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            User.findOne({where:
            { username: userParam.username }})
            .then(function (user) {

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            email: userParam.email,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        var userUpd = User.build({ id: id}, { isNewRecord: false });
       
        userUpd.update({$set : set}, { where: { id: id } })
        .then(function(){
            deferred.resolve();
        });

        // User.update( {
        //          $set: set 
        //         }, {
        //     where:{
        //          id: id
        //      }});
            
        // deferred.resolve();
    
            
    }

    return deferred.promise;
}

function _delete(id) {
    var deferred = Q.defer();

    var userDel = User.build({ id: id}, { isNewRecord: false });

    
    userDel.destroy({ where: { id: id} })
    .then(function(destroyed){
        deferred.resolve();
    });

    return deferred.promise;
}

function blocking(id) {

    return updateById(id, 1);
}

function unblock(id) {

    return updateById(id, 0);
}

function addAdmin(id) {

    return adminById(id, 1);
}

function deleteAdmin(id) {

    return adminById(id, 0);
}

function updateById(id, activated){
    var deferred = Q.defer();
    
    User.findById(id)
    .then(function () {

            var userUpd = User.build({ id: id }, { isNewRecord: false });

            userUpd.update({activated: activated}, { where: { id: id } })
            .then(function(){
                deferred.resolve();
            });                 
               
    });

    return deferred.promise;

}

function adminById(id, activated){
    var deferred = Q.defer();
    
    User.findById(id)
    .then(function () {

            var userUpd = User.build({ id: id }, { isNewRecord: false });

            userUpd.update({activated: activated}, { where: { id: id } })
            .then(function(){
                deferred.resolve();
            });                 
               
    });

    return deferred.promise;

}
