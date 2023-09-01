const { hash } = require("bcryptjs");
const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const {
  readData,
  writeData,
  getRandomAvatar,
  getRandomAddress,
  getRandomPhone,
} = require("./util");

async function add(data) {
  const storedData = await readData("users.json");

  const userId = generateId();

  const hashedPw = await hash(data.password, 12);

  if (!storedData.users) {
    storedData.users = [];
  }

  const avatar = await getRandomAvatar();
  const phone = getRandomPhone();

  storedData.users.push({
    id: userId,
    ...data,
    isAdmin: false,
    createdAt: new Date().getTime(),
    avatar,
    phone,
    password: hashedPw,
  });

  await writeData("users.json", storedData);
  return { id: userId, email: data.email };
}

async function get(email) {
  const storedData = await readData("users.json");
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = storedData.users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}

exports.add = add;
exports.get = get;
