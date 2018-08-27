var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/comment', addComment);

router.get('/comment', getComment);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:id', update);
router.get('/:id', blocking);
router.get('/:name', getByName);
router.get('/unblock/:id', unblock);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect or you are blocked');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body, req.params.activated)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function addComment(req, res) {
    userService.addComment(req.comment)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}



function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            console.log(users);
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getComment(req, res) {
    userService.getComment(req.postId, req.login)
        .then(function (comment) {
            console.log(comment);
            res.send(comment);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params.id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    var deleteSelf = req.user.sub === req.params.id;
    userService.delete(req.params.id)
        .then(function () {
            res.json({deleteSelf: deleteSelf});
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getByName(req, res) {
    userService.getByName(req.username)
        .then(function (users) {
            console.log(users);
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function blocking(req, res) {
    var deleteSelf = req.user.sub === req.params.id;
    userService.blocking(req.params.id)
        .then(function () {
        res.json({deleteSelf: deleteSelf});
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
        
}

function unblock(req, res) {
    userService.unblock(req.params.id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}





