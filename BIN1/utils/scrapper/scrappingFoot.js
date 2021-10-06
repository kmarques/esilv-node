const http = require("http");

const request = http.request(
  "http://api.football-data.org/v2/competitions/PL/matches/?dateFrom=2021-10-01&dateTo=2021-10-05",
  {
    headers: {
      "X-Auth-Token": "53337311743e4b108413256cdbfb31bc",
    },
  },
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

      data = data.matches.map((item) => ({
        homeTeam: item.homeTeam.name,
        awayTeam: item.awayTeam.name,
        score:
          item.score.fullTime.homeTeam + " - " + item.score.fullTime.awayTeam,
      }));

      console.log(data);
    });
  }
);

request.end();
