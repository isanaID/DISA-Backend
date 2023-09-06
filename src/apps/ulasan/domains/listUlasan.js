const UlasanModel = require("../../../models/destinasi/ulasanModel");

module.exports = (data) =>
  new Promise(async (resolve, reject) => {
    const query = [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "destinasis",
          localField: "destinasi",
          foreignField: "_id",
          as: "destinasi",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] }, // Ambil elemen pertama dari array "user"
          destinasi: { $arrayElemAt: ["$destinasi", 0] }, // Ambil elemen pertama dari array "destinasi"
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const destinasi = UlasanModel.aggregate(query, { allowDiskUse: true });
    await UlasanModel.aggregatePaginate(destinasi)
      .then(async (result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
