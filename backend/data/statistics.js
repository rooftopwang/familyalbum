const { readData } = require("./util");

async function getStatistics() {
  const data = await readData("memories.json");
  let allMemories = data.memories || [];
  allMemories.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });

  // count for types
  const types = ["pets", "dishes", "cities"];
  const typesCount = [0, 0, 0];
  for (const memory of allMemories) {
    const index = types.indexOf(memory.type);
    typesCount[index] = typesCount[index] + 1;
  }

  // make slices
  memories = allMemories.length < 6 ? allMemories : allMemories.slice(0, 6);
  const feeds = memories.map((memory) => {
    const feed = ({ id, title, createdAt, filename, type } = memory);
    return feed;
  });

  return {
    feeds,
    types: typesCount,
  };
}

exports.getStatistics = getStatistics;
