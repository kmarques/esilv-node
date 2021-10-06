const Scrapper = require("./scrapper");

const scrapper = new Scrapper({
  url: "http://www.omdbapi.com/?s=Batman&page=2&apikey=6565fb34",
  processData: (data) => {
    return data["Search"].map((item) => item.Title);
  },
});

scrapper.prepare().start();
