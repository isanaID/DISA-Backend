const DestinasiModel = require("../../../models/destinasi/destinasiModel");

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    DestinasiModel.findOne({ code: query.code })
      .then((res) => {
        let visitor = res.visitor;
        if (query.status == "in") {
          visitor++;
        } else {
          if (visitor <= 0) {
            resolve("tidak bisa keluar");
            return;
          }
          visitor--;
        }
        DestinasiModel.findOneAndUpdate(
          { code: query.code },
          { visitor: visitor },
          { new: true }
        )
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
