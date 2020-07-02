var express = require('express');
var router = express.Router();
var firebaseDB = require('../Firebase/firebaseDbConnection')


router.get('/', function(req, res, next) {
    res.json({message: "Hello friend, if you have came you have a reason"});
});

module.exports = router;

