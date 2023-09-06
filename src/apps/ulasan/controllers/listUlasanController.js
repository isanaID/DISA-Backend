const message = require("../../../utils/responseWeb");

const { listUlasan } = require("../domains");

module.exports = async ({ data }) => {
  try {
    let result = await listUlasan(data);
    if (!result) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success show list ulasan",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
