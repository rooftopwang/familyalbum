var express = require("express");
var router = express.Router();
var { getMemories } = require("../data/memories");

router.get("/", async (req, res, next) => {
  const dto = await getMemories();
  res.json(dto);
});

module.exports = router;
