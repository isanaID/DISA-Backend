const message = require("../../../utils/responseWeb");

const { listReward } = require("../domains");

module.exports = async ({ data }) => {
  try {
    let result = await listReward(data);
    if (!result) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success show list reward",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
