const https = require("https");

const request = https.request(
  "https://pomber.github.io/covid19/timeseries.json",
  {},
  (res) => {
    console.log("code", res.statusCode);
    console.log("headers", JSON.stringify(res.headers));

    let data = [];
    res.on("data", (chunk) => data.push(chunk));

    res.on("end", () => {
      data = Buffer.concat(
        data,
        data.reduce((acc, item) => acc + item.length, 0)
      );

      data = JSON.parse(data);

      const now = new Date(),
        nowFormatted =
          now.getFullYear() +
          "-" +
          (now.getMonth() + 1) +
          "-" +
          (now.getDate() - 2);

      for (let country in data) {
        data[country] = data[country].find(
          (item) => item.date === nowFormatted
        );
      }

      console.log(
        "totalDeath",
        Object.values(data).reduce((acc, item) => acc + item.deaths, 0)
      );

      console.log(data);
    });
  }
);

request.end();
