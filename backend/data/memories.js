const { get } = require("./user");
const { GET, POST, getRandomMemory, getEmailFromToken } = require("./util");

const getMemories = async () => {
  const memories = (await GET("memories")) || [];

  const users = await GET("users");

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
