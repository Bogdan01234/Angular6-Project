var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

router.post('/instruction', instruction);


module.exports = router;


function instruction(req, res) {
    console.log(req.instruction, "2222")
    userService.addPosts(req.instruction)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}