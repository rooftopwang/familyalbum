const { get } = require("./user");
const {
  readData,
  writeData,
  getRandomMemory,
  getEmailFromToken,
} = require("./util");

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
  let email = "";

  if (randomuser) {
    const data = await readData("users.json");
    const emails = data.users.map((user) => user.email);
    email = emails[Math.floor(Math.random() * emails.length)];
  } else {
    email = getEmailFromToken(token);
  }

  const user = await get(email);
  const randomMemory = await getRandomMemory(user);

  // data entry
  const storedData = await readData("memories.json");
  storedData.memories = storedData.memories || [];
  storedData.memories.unshift(randomMemory);

  await writeData("memories.json", storedData);
};

const addMultipleRandomMemories = async (howmany = 6) => {
  const users = (await readData("users.json")).users;
  const memoryStore = await readData("memories.json");

  const emails = users.map((user) => user.email);
  memoryStore.memories = memoryStore.memories || [];
  let i = 0;
  while (i < 6) {
    i += 1;
    const email = emails[Math.floor(Math.random() * emails.length)];
    const user = await get(email);
    const randomMemory = await getRandomMemory(user);
    memoryStore.memories.unshift(randomMemory);
  }
  await writeData("memories.json", memoryStore);
};
exports.getMemories = getMemories;
exports.addRandomMemory = addRandomMemory;
exports.addMultipleRandomMemories = addMultipleRandomMemories;
