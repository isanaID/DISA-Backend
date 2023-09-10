const RewardModel = require("../../../models/user/rewardModel");

module.exports = (data) =>
  new Promise((resolve, reject) => {
    RewardModel.create(data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
