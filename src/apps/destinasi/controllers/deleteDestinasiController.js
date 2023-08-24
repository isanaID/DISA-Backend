const message = require("../../../utils/responseWeb");

const { deleteDestinasi } = require("../domains");

module.exports = async ({ data, destinasiId }) => {
  try {
    let remove = await deleteDestinasi(destinasiId);
    if (!remove) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success remove destinasi",
      data: remove,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
