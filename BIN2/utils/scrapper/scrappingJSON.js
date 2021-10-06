const https = require("https");
const { Buffer } = require("buffer");

const req = https.request(
  "https://pomber.github.io/covid19/timeseries.json",
  {},
  (res) => {
    console.log("status", res.statusCode);
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

      const result = {};
      for (let country in data) {
        const currentValue = data[country].find(
          (item) => item.date === nowFormatted
        );
        result[country] = currentValue;
      }
      console.log(result);
    });
  }
);

req.end();
