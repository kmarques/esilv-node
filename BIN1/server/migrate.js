const connection = require("./models/db");
require("./models/user");
require("./models/animal");

connection
  .sync({
    alter: true,
  })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());
