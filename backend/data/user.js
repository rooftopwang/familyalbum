const { hash } = require("bcryptjs");
const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const {
  GET,
  POST,
  getRandomAvatar,
  getRandomPhone,
  getRandomUser,
} = require("./util");

async function add(data) {
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  const avatar = await getRandomAvatar();
  const phone = getRandomPhone();

  const newUser = {
    id: userId,
    ...data,
    isAdmin: false,
    createdAt: new Date().getTime(),
    avatar,
    phone,
    password: hashedPw,
  };

  await POST("users", [newUser]);
  return { id: userId, email: data.email };
}

async function addMultipleRandomUsers(howmany) {
  const tasks = Array(howmany).fill(0);
  const newUsers = await Promise.all(
    tasks.map(async (_) => {
      const newUser = await getRandomUser();
      const userId = generateId();
      const hashedPw = await hash(newUser.password, 12);
      const avatar = await getRandomAvatar();
      const phone = getRandomPhone();
      return {
        id: userId,
        ...newUser,
        isAdmin: false,
        createdAt: new Date().getTime(),
        avatar,
        phone,
        password: hashedPw,
      };
    })
  );

  await POST("users", newUsers);
  return;
}

async function get(email) {
  const users = await GET("users");
  if (!users || users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}

async function getAllUsers() {
  let users = await GET("users");
  users = users.map((user) => {
    delete user.password;
    return user;
  });

  return users;
}

exports.add = add;
exports.get = get;
exports.addMultipleRandomUsers = addMultipleRandomUsers;
exports.getAllUsers = getAllUsers;
