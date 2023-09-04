var express = require("express");
var router = express.Router();
const { add, addMultipleRandomUsers } = require("../data/user");
const {
  addRandomMemory,
  addMultipleRandomMemories,
} = require("../data/memories");
const { createJSONToken } = require("../util/auth");
const { getRandomUser, deleteALlContent } = require("../data/util");

router.post("/randomuser", async (req, res, next) => {
  try {
    const data = await getRandomUser();
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/randommemory", async (req, res, next) => {
  try {
    await addRandomMemory(req.body.token, req.body.randomuser);
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  return res.sendStatus(200);
});

router.post("/deleteall", async function (req, res, next) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  await deleteALlContent();
  res.sendStatus(200);
});

router.post("/fillrandom", async function (req, res, next) {
  const howmany = req.body.howmany || 6;

  try {
    await addMultipleRandomUsers(howmany);
    await addMultipleRandomMemories(howmany);
    res.sendStatus(200);
  } catch (err) {
    console.log("inside /fillrandom: ");
    console.log(err);
    console.log("inside /fillrandom end. ");
    res.status(500).send(err);
  }
});

module.exports = router;
