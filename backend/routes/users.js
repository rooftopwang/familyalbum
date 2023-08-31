var express = require("express");
var router = express.Router();
var { readData } = require("../data/util");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  var data = await readData("data.json");
  console.log(data);
  var customers = data.customers;

  res.send(customers);
});

module.exports = router;
