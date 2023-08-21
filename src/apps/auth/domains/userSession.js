const UserSession = require("../../../models/user/userSession");

const updateSession = (data) => {
  return new Promise(async (resolve, reject) => {
    UserSession.findOneAndUpdate(
      { userId: data.userId },
      { $set: { sessionId: data.sessionId } },
      { new: true },
      (err, result) => {
        if (err) {
          reject(false);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // save data session mongoose
      await UserSession.create(data)
        .then(async (result) => {
          resolve(result);
        })
        .catch(async (err) => {
          // handle error unique key mongoose
          if (err.code === 11000) {
            // update session
            await updateSession(data)
              .then(async (result) => resolve(result))
              .catch((err) => reject(err));
          }
          resolve(false);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
