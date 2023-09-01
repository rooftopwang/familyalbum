var express = require("express");
var router = express.Router();
var fs = require("fs");
const { v4: generateId } = require("uuid");

var { readData, writeData } = require("../data/util");
const { get } = require("../data/user");

/* GET users listing. */
router.post("/", async (req, res, next) => {
  //   var data = await readData("users.json");
  //   var users = data.users.map((user) => {
  //     delete user.password;
  //     return user;
  //   });

  const token = req.body.token;
  let user = null;
  try {
    const obj = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    user = await get(obj.email);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const response = await fetch(
    "https://api.api-ninjas.com/v1/randomimage?category=nature",
    {
      method: "GET",
      headers: {
        "X-Api-Key": "pIQj3H/1jY4C/1AMUy8vTw==JmAjOEz6ulQmAfVr",
        Accept: "image/jpg",
      },
    }
  );

  //   if (!response.ok) throw new Error("fail to create image. ");

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const createdAt = new Date().getTime();
  const filename = `./public/images/memory-${createdAt}.png`;
  await fs.promises.writeFile(filename, buffer);

  const storedData = await readData("memories.json");
  const memoryId = generateId();
  if (!storedData.memories) {
    storedData.memories = [];
  }

  storedData.memories.push({
    id: memoryId,
    userId: user.id,
    createdAt,
    filename,
    type: ["Pets", "Dishes", "Selfie"][Math.floor(Math.random() * 3)],
  });

  await writeData("memories.json", storedData);

  res.send(null);
});

module.exports = router;
