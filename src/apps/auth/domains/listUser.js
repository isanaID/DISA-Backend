const User = require("../../../models/user/userModel");

module.exports = (query, options) =>
  new Promise((resolve, reject) => {
    User.paginate(query, options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
