const { updateReward } = require("../domains");

const message = require("../../../utils/responseWeb");

module.exports = async ({ data, id }) => {
  try {
    let result = await updateReward(id, data);
    return message.successResponse({
      message: "success update reward",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
