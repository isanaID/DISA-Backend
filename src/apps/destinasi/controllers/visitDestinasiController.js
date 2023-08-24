const message = require("../../../utils/responseWeb");

const { visitDestinasi } = require("../domains");

module.exports = async ({ data }) => {
  try {
    let update = await visitDestinasi(data);
    if (!update) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success visit destinasi",
      data: update,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
