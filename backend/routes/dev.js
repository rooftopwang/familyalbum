var express = require("express");
var router = express.Router();
const { add, addMultiple } = require("../data/user");
const { addRandomMemory } = require("../data/memories");
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

  // add new users
  const newUsers = [];
  let i = 0;
  while (i < howmany) {
    const newuser = await getRandomUser();
    newUsers.push(newuser);
  }

  // add new memories

  try {
    await createMultiple(newUsers);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
