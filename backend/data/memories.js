const { v4: generateId } = require("uuid");
const { get } = require("../data/user");
const {
  readData,
  writeData,
  saveBlob,
  getRandomMemoryDesc,
  getEmailFromToken,
} = require("../data/util");

const getMemories = async () => {
  const data = await readData("memories.json");
  const memories = data.memories || [];

  const usersData = await readData("users.json");
  const users = usersData.users;

  const dtos = memories.map((memory) => {
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
  return dtos;
};

const addRandomMemory = async (token, randomuser) => {
  let user = null;
  let email = "";

  if (randomuser) {
    const data = await readData("users.json");
    const emails = data.users.map((user) => user.email);
    email = emails[Math.floor(Math.random() * emails.length)];
  } else {
    email = getEmailFromToken(token);
  }

  user = await get(email);

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

  if (!response.ok) throw "fail to create image. ";

  const createdAt = new Date().getTime();

  // blob
  const blob = await response.blob();
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

  await saveBlob(filename, blob);
  await writeData("memories.json", storedData);
};

exports.getMemories = getMemories;
exports.addRandomMemory = addRandomMemory;
