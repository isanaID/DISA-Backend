const jwt = require("jsonwebtoken");
const config = require("../config/config");
const SECRET = config.jwt.secret;
const EXPIRED = config.jwt.accessExpirationMinutes;
function generateToken(data, expired = EXPIRED) {
  const token = jwt.sign(data, SECRET, { expiresIn: "1d" });
  return token;
}

module.exports = generateToken;
