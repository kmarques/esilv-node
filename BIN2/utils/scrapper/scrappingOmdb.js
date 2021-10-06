const http = require("http");
const { Buffer } = require("buffer");

const req = http.request(
  "http://www.omdbapi.com/?s=Batman&page=2&apikey=6565fb34",
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

      console.log(data["Search"].map((item) => item.Title));
    });
  }
);

req.end();
