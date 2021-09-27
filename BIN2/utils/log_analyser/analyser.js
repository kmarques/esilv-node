const fs = require("fs");
console.log(process.cwd());
const filePath = "./utils/log_analyser/access.log";

fs.access(filePath, fs.constants.R_OK, function (err) {
  if (err) {
    console.error("File not readable");
  } else {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        console.error("Error while reading", err);
      } else {
        const logs = data.toString();
        const splittedLogs = logs.split("\n").map(function (item) {
          return item.match(
            /(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) (?<verb>GET|POST|DELETE|PUT) (?<code>\d{3}) (?<url>.*)/
          ).groups;
        });
        console.log(splittedLogs);
      }
    });
  }
});
