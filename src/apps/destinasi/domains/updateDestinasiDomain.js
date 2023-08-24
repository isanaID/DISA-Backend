const DestinasiModel = require("../../../models/destinasi/destinasiModel");

module.exports = (query, data) => {
  return new Promise((resolve, reject) => {
    DestinasiModel.findByIdAndUpdate(query.id, data, { new: true })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
