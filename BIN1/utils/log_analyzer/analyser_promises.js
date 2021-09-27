const fs = require("fs/promises");
const { constants } = require("fs");

const filePath = "./BIN1/utils/log_analyzer/access.log";

fs.access(filePath, constants.R_OK)
  .then(() => fs.readFile(filePath))
  .then((data) => {
    const logs = data.toString();
    return logs.split("\n").map(function (item) {
      return item.match(
        /(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}) (?<verb>GET|POST|PUT|DELETE) (?<code>\d{3}) (?<link>.*)/
      ).groups;
    });
  })
  .then((data) => console.log(data))
  .catch((e) => console.error(e));
