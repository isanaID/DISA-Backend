const RewardModel = require("../../../models/user/rewardModel");

module.exports = (id) =>
  new Promise((resolve, reject) => {
    RewardModel.findByIdAndDelete(id)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
