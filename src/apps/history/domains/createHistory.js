const History = require("../../../models/user/history");

module.exports = (data) =>
  new Promise((resolve, reject) => {
    History.create(data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
