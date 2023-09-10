const message = require("../../../utils/responseWeb");

const { listUser } = require("../domains");

module.exports = async ({ data }) => {
  try {
    let result = await listUser({}, data);
    if (!result) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success show list user",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
