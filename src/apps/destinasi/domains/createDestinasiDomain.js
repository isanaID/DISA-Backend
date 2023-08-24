const DestinasiModel = require("../../../models/destinasi/destinasiModel");

module.exports = (data) =>
  new Promise((resolve, reject) => {
    DestinasiModel.create(data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
