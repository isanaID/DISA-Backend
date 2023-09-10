const { createReward } = require("../domains");

const message = require("../../../utils/responseWeb");

module.exports = async ({ data }) => {
  try {
    let result = await createReward(data);
    return message.successResponse({
      message: "success create reward",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
