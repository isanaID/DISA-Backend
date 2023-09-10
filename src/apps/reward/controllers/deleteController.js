const message = require("../../../utils/responseWeb");

const { deleteReward } = require("../domains");

module.exports = async (destinasiId) => {
  try {
    let remove = await deleteReward(destinasiId);
    if (!remove) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success remove reward",
      data: remove,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
