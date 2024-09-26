module.exports = (req, res, next) => {
  if (!["POST", "PATCH"].includes(req.method)) next();

  let data = "";
  req.on("data", (chunk) => (data += chunk.toString()));
  req.on("end", () => {
    // Parsing
    if (req.headers["content-type"] === "application/json") {
      data = JSON.parse(data);
    }

    req.body = data;

    next();
  });
};
