const UlasanModel = require("../../../models/destinasi/ulasanModel");

module.exports = (id) =>
  new Promise((resolve, reject) => {
    UlasanModel.findByIdAndDelete(id)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
