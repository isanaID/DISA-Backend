// const UlasanModel = require("../../../models/destinasi/ulasanModel");
const RewardModel = require("../../../models/user/rewardModel");
const mongoose = require("mongoose");

module.exports = (data) =>
  new Promise(async (resolve, reject) => {
    const query = [
      {
        $match: {
          user: new mongoose.Types.ObjectId(data?.id), // Pastikan userId sesuai dengan ObjectId
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
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] }, // Ambil elemen pertama dari array "user"
          // destinasi: { $arrayElemAt: ["$destinasi", 0] }, // Ambil elemen pertama dari array "destinasi"
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const destinasi = RewardModel.aggregate(query, { allowDiskUse: true });
    await RewardModel.aggregatePaginate(destinasi, data)
      .then(async (result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
