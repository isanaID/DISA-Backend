const message = require("../../../utils/responseWeb");

const { createDestinasi } = require("../domains/");

module.exports = async ({ data }) => {
  try {
    let destinasi = await createDestinasi(data);
    return message.successResponse({
      message: "success create destinasi",
      data: destinasi,
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
