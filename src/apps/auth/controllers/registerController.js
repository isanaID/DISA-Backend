const { registerDomain } = require("../domains");
const message = require("../../../utils/responseWeb");

module.exports = async ({ req }) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;

    const newUser = await registerDomain(email, password, fullName);

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
