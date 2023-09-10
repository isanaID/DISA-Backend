const History = require("../../../models/user/history");
const mongoose = require("mongoose");
module.exports = (data) =>
  new Promise(async (resolve, reject) => {
    console.log({ data });
    const query = [
      {
        $match: {
          user: new mongoose.Types.ObjectId(data.id), // Pastikan userId sesuai dengan ObjectId
        },
      },
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

    const destinasi = History.aggregate(query, { allowDiskUse: true });
    await History.aggregatePaginate(destinasi, data)
      .then(async (result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
