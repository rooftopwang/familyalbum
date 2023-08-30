var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data = require('../database/data.json');
    var customers = data.customers;
    res.send(customers);
});

module.exports = router;
