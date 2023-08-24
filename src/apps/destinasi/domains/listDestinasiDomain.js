const DestinasiModel = require("../../../models/destinasi/destinasiModel");

module.exports = (data) =>
  new Promise(async (resolve, reject) => {
    const query = [
      {
        $match: {
          $and: [
            {
              $or: [{ name: { $regex: new RegExp(data.name), $options: "i" } }],
            },
            {
              $or: [{ city: { $regex: new RegExp(data.city), $options: "i" } }],
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const destinasi = DestinasiModel.aggregate(query, { allowDiskUse: true });
    await DestinasiModel.aggregatePaginate(destinasi)
      .then(async (result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
