const User = require("../../../models/user/userModel");

module.exports = (id, data) =>
  new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
