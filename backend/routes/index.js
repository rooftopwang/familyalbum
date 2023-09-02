var express = require("express");
var router = express.Router();
var { getStatistics } = require("../data/statistics");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/statistics", async function (req, res, next) {
  const dtos = await getStatistics();
  res.send(dtos);
});

module.exports = router;
