var express = require("express");
var router = express.Router();
var { getStatistics } = require("../data/statistics");
var { deleteALlContent } = require("../data/util");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/statistics", async function (req, res, next) {
  const dtos = await getStatistics();
  res.send(dtos);
});

router.post("/deleteall", async function (req, res, next) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  await deleteALlContent();
  res.sendStatus(200);
});
module.exports = router;
