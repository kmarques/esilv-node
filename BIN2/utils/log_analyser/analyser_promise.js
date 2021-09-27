const fs = require("fs/promises");
const { constants } = require("fs");

const filePath = "./BIN2/utils/log_analyser/access.log";

fs.access(filePath, constants.R_OK)
  .then(() => fs.readFile(filePath))
  .then((data) => {
    const logs = data.toString();
    return logs.split("\n").map(function (item) {
      return item.match(
        /(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) (?<verb>GET|POST|DELETE|PUT) (?<code>\d{3}) (?<url>.*)/
      ).groups;
    });
  })
  .then((data) => console.log(data))
  .catch((e) => console.error(e));
