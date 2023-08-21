const User = require("../../../models/user/userModel");
const UserSession = require("./userSession");
const generateToken = require("../../../helpers/generateJwt");

const bcrypt = require("bcrypt");

module.exports = async (email, password) => {
  try {
    // Cek apakah ada user dengan email tersebut
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Email or Password is Not Valid");
    }

    // Cek apakah password yang dimasukkan benar
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email or Password is Not Valid");
    }

    const sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const dataSession = {
      sessionId: sessionId,
      userId: user._id,
    };

    const dataSessionSave = await UserSession(dataSession);
    if (!dataSessionSave)
      return message.failureResponse({ meessage: "error create session" });
    const dataToken = {
      sessionId: sessionId,
    };

    const jwt = generateToken(dataToken);

    user = user.toObject();

    delete user.password;

    user.token = jwt;

    // User ditemukan dan password cocok
    return user;
  } catch (error) {
    throw error;
  }
};
