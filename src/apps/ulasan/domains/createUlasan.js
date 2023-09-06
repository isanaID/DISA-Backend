const UlasanModel = require("../../../models/destinasi/ulasanModel");

module.exports = (data) =>
  new Promise((resolve, reject) => {
    UlasanModel.create(data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
