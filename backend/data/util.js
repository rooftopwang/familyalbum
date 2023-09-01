const fs = require("node:fs/promises");

async function readData(filename) {
  try {
    filename = `data/${filename}`;
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

async function writeData(filename, obj) {
  filename = `data/${filename}`;
  try {
    await fs.writeFile(filename, JSON.stringify(obj));
  } catch (e) {
    // to-do: handle error
  }
}

async function saveBlob(filename, blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filename, buffer);
}

function getEmailFromToken(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())
    .email;
}

async function getRandomAvatar() {
  const data = await readData("data.json");
  const avatars = data.newavatars;
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];
  return avatar;
}

async function getRandomAddress() {
  const data = await readData("data.json");
  const addresses = data.newaddress;
  const address = addresses[Math.floor(Math.random() * addresses.length)];
  return address;
}

async function getRandomMemoryDesc(category) {
  const data = await readData("data.json");
  const feeds = data[category];
  const feed = feeds[Math.floor(Math.random() * feeds.length)];
  return feed;
}

function getRandomPhone() {
  return `${
    Math.floor(Math.random() * 10) % 2 == 1 ? "647" : "416"
  }-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`;
}

exports.readData = readData;
exports.writeData = writeData;
exports.saveBlob = saveBlob;
exports.getEmailFromToken = getEmailFromToken;
exports.getRandomAvatar = getRandomAvatar;
exports.getRandomAddress = getRandomAddress;
exports.getRandomPhone = getRandomPhone;
exports.getRandomMemoryDesc = getRandomMemoryDesc;
