const express = require("express");
const router = express.Router();
const { getImage } = require("../data/firebase");

router.post("/memory/:filename", async (req, res, next) => {
  if (process.env.USE_FIREBASE === "true") {
    const data = await GET_IMAGE("memory", req.params.filename);
    res.send(data);
  } else {
    res.render("/public/image/" + req.params.filename);
  }
});

module.exports = router;
