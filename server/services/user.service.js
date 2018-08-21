﻿var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var User  = require('../models').user;

var index = require('../models/index');




var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.blocking = blocking;
service.unblock = unblock;
service.delete = _delete;



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
    

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(id) {
    var deferred = Q.defer();

    db.users.findById(id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

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

        // emailSent(user.hash)
    }
    function emailSent(hash){
    
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'mail.ru',
            auth: {
            user: 'bogdan01234@mail.ru',
            pass: 'rfntymrf0123'
            }
        });
        
        var mailOptions = {
    
            from: 'bogdan01234@mail.ru',
            to: userParam.email,
            subject: 'Sending Email using Node.js',
            text: 'http://localhost:4000/users/activate/?hash=' + hash
        
        };
    
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    return deferred.promise;
}

function update(id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

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

        db.users.update(
            { id: mongo.helper.toObjectID(id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(id) {
    var deferred = Q.defer();

    db.users.remove(
        { id: mongo.helper.toObjectID(id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function blocking(id) {
    var deferred = Q.defer();
    
    db.users.findById(id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        var set = {
            activated: 1
        };

        db.users.update(
            { id: mongo.helper.toObjectID(id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    });

    return deferred.promise;
}

function unblock(id) {
    var deferred = Q.defer();
    
    db.users.findById(id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        var set = {
            activated: 0
        };

        db.users.update(
            { id: mongo.helper.toObjectID(id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    });

    return deferred.promise;
}

function activate(hash){
    console.log("ADD HASH");
}

