const { createUlasan } = require("../domains");

const message = require("../../../utils/responseWeb");

module.exports = async ({ data }) => {
  try {
    let result = await createUlasan(data);
    return message.successResponse({
      message: "success create ulasan",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
