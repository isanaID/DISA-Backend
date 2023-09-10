const User = require("../../../models/user/userModel");

module.exports = async (id) => {
  try {
    const result = await User.findById(id);
    return result;
  } catch (err) {
    throw err;
  }
};
