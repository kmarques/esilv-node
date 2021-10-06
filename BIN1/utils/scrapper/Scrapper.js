const https = require("https");
const http = require("http");

class Scrapper {
  constructor({ url, processData, ...options }) {
    this.protocol = url.startsWith("https") ? https : http;
    this.url = url;
    this.options = options;
    this.processData = processData;
  }

  prepare() {
    this.request = this.protocol.request(this.url, this.options, (res) => {
      console.log("code", res.statusCode);
      console.log("headers", JSON.stringify(res.headers));

      let data = [];
      res.on("data", (chunk) => data.push(chunk));

      res.on("end", () => {
        data = Buffer.concat(
          data,
          data.reduce((acc, item) => acc + item.length, 0)
        );

        if (res.headers["content-type"].includes("/json")) {
          data = JSON.parse(data);
        }

        data = this.processData(data);

        console.log(data);
      });
    });

    return this;
  }

  start() {
    this.request.end();
  }
}

module.exports = Scrapper;
