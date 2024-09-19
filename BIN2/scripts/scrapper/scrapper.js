const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

console.log(process.env);
const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&s=gladiator`;

const request = http.request(
  url,
  {
    headers: {
      Accept: "application/json",
    },
  },
  (response) => {
    if (response.statusCode >= 300) {
      console.error(
        "Something wrong happened while scrapping",
        response.statusCode,
        response.statusText
      );
      process.exit(2);
    }

    if (!response.headers["content-type"].startsWith("application/json")) {
      console.error(
        `Response type not managed, found "${response.headers["content-type"]}"`
      );
      process.exit(2);
    }

    let data = "";
    response.on("data", (chunk) => (data += chunk.toString()));

    response.on("end", () => {
      // 1) Parsing
      if (response.headers["content-type"].startsWith("application/json")) {
        data = JSON.parse(data);
      }

      // 2) Process
      const result = data.Search.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
      }));

      // 3) Save Data
      const headers = Object.keys(result[0]);
      const values = result.map((movie) => Object.values(movie));
      const csvContent =
        headers.join(";") +
        "\n" +
        values.map((item) => item.join(";")).join("\n");
      fs.writeFileSync(path.join(__dirname, "output.csv"), csvContent);
    });
  }
);

request.end();
