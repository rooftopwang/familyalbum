const { GET } = require("./util");

async function getStatistics() {
  const monthlyGoalSetting = (await GET("global"))[0].monthlyGoal;
  const users = (await GET("users")) || [];

  let allMemories = (await GET("memories")) || [];
  allMemories.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });

  // contributerOfMonth
  const contributors = {};
  users.forEach((user) => {
    contributors[user.id] = {
      name: user.name,
      contribute: 0,
    };
  });

  // count for types
  const types = ["pets", "dishes", "cities"];
  const typesCount = [0, 0, 0];
  let thisMonthSum = 0;
  for (const memory of allMemories) {
    const index = types.indexOf(memory.type);
    typesCount[index] = typesCount[index] + 1;
    thisMonthSum += 1;
    contributors[memory.userId].contribute += 1;
  }

  //   const total = typesCount.reduce((s, n) => s + n, 0);
  const typesPercentage =
    thisMonthSum === 0
      ? [0, 0, 0]
      : typesCount.map((c) => Math.floor((c * 100) / thisMonthSum));

  // feeds
  memories = allMemories.length < 6 ? allMemories : allMemories.slice(0, 6);

  const feeds = memories.map((memory) => {
    const feed = ({ id, title, createdAt, filename, type } = memory);
    const user = users.find(function (u) {
      return u.id === memory.userId;
    });

    feed.author = user == null ? "unknown" : user.name;
    return feed;
  });

  // count
  const prevMemoriesCount = [
    {
      name: "This year",
      data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
    },
    {
      name: "Last year",
      data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
    },
  ];

  const lastMonthSum = prevMemoriesCount[0].data[10];
  const prevYearSum = prevMemoriesCount[1].data.reduce((s, n) => s + n, 0);
  const thisYearSum =
    prevMemoriesCount[0].data.reduce((s, n) => s + n, 0) -
    prevMemoriesCount[0].data[11];

  // annualUpload
  const annualUpload = {
    digit: prevYearSum + thisYearSum + thisMonthSum,
    difference: thisYearSum + thisMonthSum - prevYearSum,
  };
  // monthlyUpload
  const monthlyUpload = {
    digit: thisMonthSum,
    difference: thisMonthSum - lastMonthSum,
  };
  // monthlyGoal
  const monthlyGoal = {
    digit: (thisMonthSum * 100) / monthlyGoalSetting,
    progress: (thisMonthSum * 100) / monthlyGoalSetting,
  };

  // contributerOfMonth
  let contributerOfMonth = {
    name: "",
    contribute: 0,
  };
  for (const contributor of Object.values(contributors)) {
    if (contributor.contribute > contributerOfMonth.contribute)
      contributerOfMonth = contributor;
  }
  contributerOfMonth.name = contributerOfMonth.name.split(" ")[0];

  // chartData
  prevMemoriesCount[0].data[11] = thisMonthSum;

  return {
    feeds,
    types: typesPercentage,
    annualUpload,
    monthlyUpload,
    monthlyGoal,
    contributerOfMonth,
    chartData: prevMemoriesCount,
  };
}

exports.getStatistics = getStatistics;
