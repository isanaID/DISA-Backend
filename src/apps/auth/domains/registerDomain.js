const User = require("../../../models/user/userModel");

module.exports = async (email, password, fullName) => {
  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Buat user baru
    const newUser = new User({
      email,
      password,
      fullName,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    throw error;
  }
};
