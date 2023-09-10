const DestinasiModel = require("../../../models/destinasi/destinasiModel");
const mongoose = require("mongoose");

module.exports = (queryParam) =>
  new Promise(async (resolve, reject) => {
    console.log({ queryParam });
    const query = [
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  name: {
                    $regex: new RegExp(queryParam?.search),
                    $options: "i",
                  },
                },
                {
                  address: {
                    $regex: new RegExp(queryParam?.search),
                    $options: "i",
                  },
                },
              ],
            },
            // {
            //   $or: [
            //     {
            //       address: {
            //         $regex: new RegExp(queryParam?.search),
            //         $options: "i",
            //       },
            //     },
            //   ],
            // },
            // {
            //   $or: [
            //     {
            //       city: { $regex: new RegExp(queryParam.city), $options: "i" },
            //     },
            //   ],
            // },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userUpload",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] }, // Ambil elemen pertama dari array "user"
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    if (queryParam?.id) {
      query[0].$match.$and.push({
        $or: [
          {
            userUpload: new mongoose.Types.ObjectId(queryParam?.id),
          },
        ],
      });
    }

    if (queryParam?.isShow) {
      query[0].$match.$and.push({
        $or: [
          {
            isShow: true,
          },
        ],
      });
    }

    const destinasi = DestinasiModel.aggregate(query, { allowDiskUse: true });
    await DestinasiModel.aggregatePaginate(destinasi, queryParam)
      .then(async (result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
