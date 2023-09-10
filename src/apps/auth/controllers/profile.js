const message = require("../../../utils/responseWeb");

const { profile } = require("../domains");

module.exports = async (id) => {
  console.log({ id });
  try {
    let result = await profile(id);
    if (!result) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success show profile",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
