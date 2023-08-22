const message = require("../../../utils/responseWeb");

module.exports = async ({ data }) => {
  try {
    return message.successResponse({
      message: "success GET with auth",
      data: "success",
    });
  } catch {
    return message.failureResponse();c
  }
};
