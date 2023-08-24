const message = require("../../../utils/responseWeb");

const { updateDestinasi } = require("../domains");

module.exports = async ({ data, destinasiId }) => {
  try {
    let update = await updateDestinasi(destinasiId, data);
    if (!update) return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success update destinasi",
      data: update,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
