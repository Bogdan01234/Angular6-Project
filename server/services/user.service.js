var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
// var db = mongo.db(config.connectionString, { native_parser: true });
// db.bind('users');

var User  = require('../models').user;

var Comment  = require('../models').comments;

var index = require('../models/index');




var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.addComment = addComment;
service.getComment = getComment;
service.update = update;
service.blocking = blocking;
service.unblock = unblock;
service.delete = _delete;
service.getByName = getByName;


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
            return _.omit(comment, 'hash');
        });

        deferred.resolve(comment);
      });    

    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();

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
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam,'password', 'activated');
        user.activated = activated;      
        
        

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

