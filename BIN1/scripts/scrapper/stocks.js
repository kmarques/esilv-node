const https = require("node:https");
const path = require("node:path");
const fs = require("node:fs");

const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.STOCK_APIKEY}`;

const request = https.request(
  url,
  {
    headers: {
      Accept: "application/json",
    },
  },
  (response) => {
    if (response.statusCode >= 300) {
      console.error("Something went wrong while scraping this url");
      process.exit(2);
    }

    if (response.headers["content-type"] !== "application/json") {
      console.error(
        `Response format invalid, found "response.headers['content-type']"`
      );
      process.exit(2);
    }

    let data = "";
    response.on("data", (chunk) => (data += chunk.toString()));

    response.on("end", () => {
      // Parsing
      if (response.headers["content-type"] === "application/json") {
        data = JSON.parse(data);
      }

      // Process
      const symbol = data["Meta Data"]["2. Symbol"];
      const result = Object.entries(data["Time Series (Daily)"]).map(
        ([date, value]) => ({
          date,
          symbol,
          open: value["1. open"],
          close: value["4. close"],
          diff: value["4. close"] - value["1. open"],
          diffFixed:
            (parseInt(value["4. close"].replace(".", ""), 10) -
              parseInt(value["1. open"].replace(".", ""), 10)) /
            10000,
        })
      );

      // Save
      const headers = Object.keys(result[0]);
      const values = result.map((line) => Object.values(line));
      const headerLine = headers.join(";");
      const lines = values.map((value) => value.join(";"));
      const outputPath = path.join(process.cwd(), "output.csv");
      fs.writeFileSync(outputPath, headerLine + "\n" + lines.join("\n"));

      console.log("Done");
    });
  }
);

request.end();
