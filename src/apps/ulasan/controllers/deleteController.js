const message = require("../../../utils/responseWeb");

const { deleteUlasan } = require("../domains");

module.exports = async (destinasiId) => {
  try {
    let remove = await deleteUlasan(destinasiId);
    if (!remove) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success remove ulasan",
      data: remove,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
