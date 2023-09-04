var express = require("express");
var router = express.Router();
var { getStatistics } = require("../data/statistics");
const { getUsers, setInitUsers } = require("../data/firebase");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/statistics", async function (req, res, next) {
  const dtos = await getStatistics();
  res.send(dtos);
});

router.post("/firebase", async (req, res, next) => {
  const users = await getUsers();
  res.send({
    message: users,
  });
});
module.exports = router;
