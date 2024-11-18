module.exports = function parseBody(req, res, next) {
  let data = "";
  req.on("data", (chunk) => (data += chunk.toString()));

  req.on("end", () => {
    data = JSON.parse(data);
    req.body = data;

    next();
  });
};
