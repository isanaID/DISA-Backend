const { registerDomain } = require("../domains");
const message = require("../../../utils/responseWeb");

module.exports = async ({ req }) => {
  try {
    const payload = req.body;

    const newUser = await registerDomain(payload);

    return message.successResponse({
      message: "Success Register User",
      data: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
    });
  } catch (error) {
    return message.failureResponse(error);
  }
};
