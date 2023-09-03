var express = require("express");
var router = express.Router();
var { getAllUsers } = require("../data/user");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await getAllUsers();
  res.send(users);
});

module.exports = router;
