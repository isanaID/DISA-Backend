const message = require("../../../utils/responseWeb");

const { showDestinasi } = require("../domains");

module.exports = async ({ data, destinasiId }) => {
  try {
    let show = await showDestinasi(destinasiId);
    if (!show) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success show destinasi",
      data: show,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
