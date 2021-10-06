const Scrapper = require("./scrapper");

const scrapper = new Scrapper({
  url: "https://pomber.github.io/covid19/timeseries.json",
  processData: (data) => {
    const now = new Date(),
      nowFormatted =
        now.getFullYear() +
        "-" +
        (now.getMonth() + 1) +
        "-" +
        (now.getDate() - 2);

    const result = {};
    for (let country in data) {
      const currentValue = data[country].find(
        (item) => item.date === nowFormatted
      );
      result[country] = currentValue;
    }
    return result;
  },
});

scrapper.prepare().start();
