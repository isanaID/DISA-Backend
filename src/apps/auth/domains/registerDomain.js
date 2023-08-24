const User = require("../../../models/user/userModel");

module.exports = async (data) => {
  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email: data.email });

    data.role = "user";

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Buat user baru
    const newUser = new User(data);

    await newUser.save();

    return newUser;
  } catch (error) {
    throw error;
  }
};
