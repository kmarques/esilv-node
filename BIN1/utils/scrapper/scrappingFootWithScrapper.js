const Scrapper = require("./Scrapper");

new Scrapper({
  url: "http://api.football-data.org/v2/competitions/PL/matches/?dateFrom=2021-10-01&dateTo=2021-10-05",
  headers: {
    "X-Auth-Token": "53337311743e4b108413256cdbfb31bc",
  },
  processData: (data) => {
    return data.matches.map((item) => ({
      homeTeam: item.homeTeam.name,
      awayTeam: item.awayTeam.name,
      score:
        item.score.fullTime.homeTeam + " - " + item.score.fullTime.awayTeam,
    }));
  },
})
  .prepare()
  .start();
