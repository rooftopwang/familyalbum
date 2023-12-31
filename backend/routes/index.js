var express = require("express");
var router = express.Router();
var { getStatistics } = require("../data/statistics");
const { getProfile, updateProfile } = require("../data/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome");
  // res.render("index", { title: "Express" });
});

router.get("/statistics", async function (req, res, next) {
  const dtos = await getStatistics();
  res.send(dtos);
});

router.post("/profile", async (req, res, next) => {
  // to fetch profile
  try {
    const user = await getProfile(req.body.token);
    res.send(user);
  } catch (err) {
    res.status(500).send("fail to post /profile");
  }
});

router.put("/profile", async (req, res, next) => {
  // to update profile
  try {
    const user = await updateProfile(req.body.token, req.body.profile);
    res.send(user);
  } catch (err) {
    res.status(500).send("fail to update /profile");
  }
});

router.post("/firebase", async (req, res, next) => {
  res.send({
    message: "/firebase",
  });
});
module.exports = router;
