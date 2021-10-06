const http = require("http");
const https = require("https");
const { Buffer } = require("buffer");

class Scrapper {
  constructor(options) {
    this.protocol = options.url.startsWith("https") ? https : http;
    this.options = options;
    this.processData = options.processData;
  }

  prepare() {
    this.request = this.protocol.request(this.options.url, (res) => {
      let data = [];

      res.on("data", (chunk) => data.push(chunk));

      res.on("end", () => {
        data = Buffer.concat(
          data,
          data.reduce((acc, item) => acc + item.length, 0)
        );

        if (res.headers["content-type"].includes("application/json")) {
          data = JSON.parse(data);
        }
        const processedData = this.processData(data);
        console.log(processedData);
      });
    });
    return this;
  }

  start() {
    this.request.end();
  }
}

module.exports = Scrapper;
