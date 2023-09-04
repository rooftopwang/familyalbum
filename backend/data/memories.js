const { get } = require("./user");
const { createImageUrl } = require("./firebase");
const { GET, POST, getRandomMemory, getEmailFromToken } = require("./util");

const getMemories = async () => {
  const useFirebase = process.env.USE_FIREBASE;
  const memories = (await GET("memories")) || [];

  const users = await GET("users");
  const dtos = [];
  for (const memory of memories) {
    const usersfiltered = users.filter((user) => user.id == memory.userId);
    const username =
      usersfiltered == null || usersfiltered.length == 0
        ? null
        : usersfiltered[0].name;

    if (useFirebase)
      memory.filename = await createImageUrl("memories", memory.filename);
    else memory.filename = "http://localhost:8000/images/" + memory.filename;

    dtos.push({
      ...memory,
      author: username,
    });
  }

  return dtos;
};

const addRandomMemory = async (token, randomuser) => {
  let email = "";

  if (randomuser) {
    const users = await GET("users");
    const emails = users.map((user) => user.email);
    email = emails[Math.floor(Math.random() * emails.length)];
  } else {
    email = getEmailFromToken(token);
  }

  const user = await get(email);
  const randomMemory = await getRandomMemory(user);

  await POST("memories", [randomMemory]);
};

const addMultipleRandomMemories = async (howmany = 6) => {
  const users = await GET("users");
  const emails = users.map((user) => user.email);

  const tasks = Array(howmany).fill(0);
  const newMemories = await Promise.all(
    tasks.map(async (_) => {
      const email = emails[Math.floor(Math.random() * emails.length)];
      const user = await get(email);
      const randomMemory = await getRandomMemory(user);
      return randomMemory;
    })
  );

  await POST("memories", newMemories);
};
exports.getMemories = getMemories;
exports.addRandomMemory = addRandomMemory;
exports.addMultipleRandomMemories = addMultipleRandomMemories;
