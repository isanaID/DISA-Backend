const User = require("../../../models/user/userModel");

const bcrypt = require("bcrypt");

module.exports = async (email, password) => {
  try {
    // Cek apakah ada user dengan email tersebut
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    // Cek apakah password yang dimasukkan benar
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // User ditemukan dan password cocok
    return user;
  } catch (error) {
    throw error;
  }
};
