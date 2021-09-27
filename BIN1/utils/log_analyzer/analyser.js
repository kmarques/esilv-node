const fs = require("fs");

const filePath = "./BIN1/utils/log_analyzer/access.log";

fs.access(filePath, fs.constants.R_OK, function (err) {
  if (err) {
    console.error("File not readable", err);
  } else {
    console.log("File exists");
    fs.readFile(filePath, function (err, data) {
      if (err) {
        console.error("Error while reading", err);
      } else {
        const logs = data.toString();
        console.log(
          logs.split("\n").map(function (item) {
            return item.match(
              /(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) (?<verb>GET|POST|PUT|DELETE) (?<code>\d{3}) (?<link>.*)/
            ).groups;
          })
        );
      }
    });
  }
});
