const DestinasiModel = require("../../../models/destinasi/destinasiModel");

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    DestinasiModel.findByIdAndDelete(query.id)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
