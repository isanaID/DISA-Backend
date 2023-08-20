const { loginDomain } = require("../domains");
const jwt = require("jsonwebtoken");
const message = require("../../../utils/responseWeb");

module.exports = async ({ req }) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await loginDomain(email, password);

    // Buat JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token akan expired dalam 1 hari
    });

    // Kirim respons sukses beserta token
    return message.successResponse({
      message: "Success Login",
      data: {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      },
    });
  } catch (error) {
    // Kirim respons gagal
    return message.failureResponse(error);
  }
};
