const message = require("../../../utils/responseWeb");

const { listDestinasi } = require("../domains");

module.exports = async ({ data }) => {
  try {
    let listDestinasiWisata = await listDestinasi(data);
    if (!listDestinasiWisata)
      return message.notFoundResponse({ message: "not found" });
    return message.successResponse({
      message: "success show list school room",
      data: listDestinasiWisata,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
