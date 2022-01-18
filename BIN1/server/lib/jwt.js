const jwt = require("jsonwebtoken");
const SECRET = "QSFZEGEZRéefdzegvzegfz'é";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    SECRET,
    {
      expiresIn: "1y",
      algorithm: "HS256",
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
