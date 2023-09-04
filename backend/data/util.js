const fs = require("node:fs");
const path = require("path");
const { v4: generateId } = require("uuid");
const { uploadMultipleData } = require("./firebase");
const { devNull } = require("node:os");

const useFirebase = process.env.USE_FIREBASE;

async function _readData(filename) {
  try {
    filename = `data/${filename}.json`;
    const data = await fs.promises.readFile(filename, "utf8");
    const result = JSON.parse(data);

    return result;
  } catch (e) {
    return null;
  }
}

async function _writeData(table, objs) {
  table = `data/${table}.json`;
  try {
    await fs.promises.writeFile(table, JSON.stringify(objs));
  } catch (e) {
    // to-do: handle error
  }
}

async function _addData(table, objs) {
  const filename = table;
  const path = `data/${table}.json`;
  try {
    const existingData = (await _readData(filename)) || [];
    const newData = [...existingData, ...objs];

    await fs.promises.writeFile(path, JSON.stringify(newData));
  } catch (e) {
    // to-do: handle error
  }
}

async function GET(table) {
  if (useFirebase) {
  } else {
    return await _readData(table);
  }
}

async function POST(table, objs) {
  if (useFirebase) {
  } else {
    await _addData(table, objs);
  }
}

async function deleteALlContent() {
  let users, admins;
  const defaultUser = {
    id: "6b58830d-5801-4981-88a5-db36ba6a863a",
    name: "Wolfgang Wang",
    email: "wolfgangwang@hotmail.ca",
    password: "$2a$12$aCTupDj7kjCytZSgerI55ODEd9.XTv1/STgq3Tw8DkoCefc6XYnfG",
    address: {
      city: "East Theresashire",
      country: "USA",
      state: "AK",
      street: "391 Jennifer Heights",
    },
    isAdmin: true,
    createdAt: 1693597541105,
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    phone: "647-609-9897",
  };

  try {
    users = await _readData("users");
    admins = users.filter((user) => user.isAdmin === true) || [defaultUser];
  } catch (err) {
    admins = [defaultUser];
  }

  _writeData("users", admins);
  _writeData("memories", []);

  const directory = "public/images";
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

async function saveBlob(filename, blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(filename, buffer);
}

function getEmailFromToken(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())
    .email;
}

// users
async function getRandomAvatar() {
  const data = await _readData("data");
  const avatars = data.newavatars;
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];
  return avatar;
}

async function getRandomUser() {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/randomuser", {
      method: "GET",
      headers: {
        "X-Api-Key": "pIQj3H/1jY4C/1AMUy8vTw==JmAjOEz6ulQmAfVr",
      },
    });

    const user = await response.json();
    const address = user.address.split(", ");
    const data = {
      name: user.name,
      email: user.email,
      password: "123456",
      address: {
        city: address[1],
        country: "USA",
        state: address[2].split(" ")[0],
        street: address[0],
      },
    };

    return data;
  } catch (e) {
    return await getRandomUser();
  }
}
const MEMORY_TYPES = {
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

async function getRandomMemory(user) {
  const type = [MEMORY_TYPES.PETS, MEMORY_TYPES.DISHES, MEMORY_TYPES.CITY][
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

  const memory = {
    id: generateId(),
    userId: user.id,
    createdAt,
    filename: `images/memory-${createdAt}.png`,
    type: type.type,
    title: desc.name,
    desc: desc.desc,
  };

  await saveBlob(filename, blob);
  return memory;
}

function getRandomPhone() {
  return `${
    Math.floor(Math.random() * 10) % 2 == 1 ? "647" : "416"
  }-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`;
}

// async function getRandomAddress() {
//   const data = await readData("data.json");
//   const addresses = data.newaddress;
//   const address = addresses[Math.floor(Math.random() * addresses.length)];
//   return address;
// }

// memories
async function getRandomMemoryDesc(category) {
  const data = await _readData("data");
  const feeds = data[category];
  const feed = feeds[Math.floor(Math.random() * feeds.length)];
  return feed;
}

exports.saveBlob = saveBlob;
exports.GET = GET;
exports.POST = POST;
exports.deleteALlContent = deleteALlContent;
exports.getEmailFromToken = getEmailFromToken;
exports.getRandomAvatar = getRandomAvatar;
exports.getRandomUser = getRandomUser;
exports.getRandomMemory = getRandomMemory;
// exports.getRandomAddress = getRandomAddress;
exports.getRandomPhone = getRandomPhone;
exports.getRandomMemoryDesc = getRandomMemoryDesc;
