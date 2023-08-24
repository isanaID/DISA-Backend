const DestinasiModel = require("../../../models/destinasi/destinasiModel");

module.exports = (data) =>
  new Promise(async (resolve, reject) => {
    DestinasiModel.findById(data.id)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
