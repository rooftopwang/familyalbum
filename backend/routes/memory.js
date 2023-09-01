var express = require("express");
var router = express.Router();
var fs = require("fs");
const { v4: generateId } = require("uuid");

var {
  readData,
  writeData,
  saveBlob,
  getEmailFromToken,
  getRandomMemoryDesc,
} = require("../data/util");
const { get } = require("../data/user");

router.get("/", async (req, res, next) => {
  const data = await readData("memories.json");
  const memories = data.memories;

  const usersData = await readData("users.json");
  const users = usersData.users;

  const dto = memories.map((memory) => {
    const usersfiltered = users.filter((user) => user.id == memory.userId);
    const username =
      usersfiltered == null || usersfiltered.length == 0
        ? null
        : usersfiltered[0].name;
    return {
      ...memory,
      author: username,
    };
  });

  res.json(dto);
});

router.post("/random", async (req, res, next) => {
  let user = null;
  let email = "";

  if (req.body.randomuser) {
    const data = await readData("users.json");
    const emails = data.users.map((user) => user.email);
    email = emails[Math.floor(Math.random() * emails.length)];
  } else {
    const token = req.body.token;
    email = getEmailFromToken(token);
  }

  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const types = {
    PETS: {
      type: "pets",
      imageCategory: "wildlife",
    },
    DISHES: {
      type: "dishes",
      imageCategory: "food",
    },
    CITY: {
      type: "cities",
      imageCategory: "city",
    },
  };

  const type = [types.PETS, types.DISHES, types.CITY][
    Math.floor(Math.random() * 3)
  ];
  const desc = await getRandomMemoryDesc(type.type);
  const response = await fetch(
    `https://api.api-ninjas.com/v1/randomimage?category=${type.imageCategory}`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": "pIQj3H/1jY4C/1AMUy8vTw==JmAjOEz6ulQmAfVr",
        Accept: "image/jpg",
      },
    }
  );

  if (!response.ok) res.status(401).json({ message: "fail to create image. " });

  // blob
  const blob = await response.blob();
  const createdAt = new Date().getTime();
  const filename = `./public/images/memory-${createdAt}.png`;

  // data entry
  const storedData = await readData("memories.json");
  const memoryId = generateId();
  if (!storedData.memories) storedData.memories = [];

  storedData.memories.push({
    id: memoryId,
    userId: user.id,
    createdAt,
    filename: `images/memory-${createdAt}.png`,
    type: type.type,
    title: desc.name,
    desc: desc.desc,
  });

  try {
    await saveBlob(filename, blob);
    await writeData("memories.json", storedData);
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }

  return res.sendStatus(200);
});

module.exports = router;
