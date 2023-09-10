const message = require("../../../utils/responseWeb");

const { listHirstory } = require("../domains");

module.exports = async (data) => {
  try {
    let result = await listHirstory(data);
    if (!result) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success show list reward",
      data: result,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
