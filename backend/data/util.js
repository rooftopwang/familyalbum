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

exports.readData = readData;
exports.writeData = writeData;
