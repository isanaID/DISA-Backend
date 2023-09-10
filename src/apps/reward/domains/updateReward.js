const RewardModel = require("../../../models/user/rewardModel");

module.exports = (id, data) =>
  new Promise((resolve, reject) => {
    RewardModel.findByIdAndUpdate(id, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
