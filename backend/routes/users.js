var express = require("express");
var router = express.Router();
var { readData } = require("../data/util");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  var data = await readData("users.json");
  var users = data.users.map((user) => {
    delete user.password;
    return user;
  });

  res.send(users);
});

module.exports = router;
