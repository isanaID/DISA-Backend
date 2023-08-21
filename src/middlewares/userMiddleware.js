const jwt = require("jsonwebtoken");
const sessionModel = require("../models/user/userSession");
const timeHelpers = require("../helpers/TimeHelper");
const message = require("../utils/responseWeb/");
const sendResponse = require("../utils/responseWeb/responseHandler");
const SECRET = process.env.JWT_SECRET;

// check session in database
const checkSession = async (sessionId = null) => {
  try {
    const session = await sessionModel
      .findOne({
        sessionId: sessionId,
      })
      .select({ createdAt: 0, updatedAt: 0, __v: 0 });

    if (!session) return false;
    const expired = await timeHelpers.isExpired(session.expiredIn);
    if (expired) return false;
    return session;
  } catch (error) {
    return false;
  }
};

// verify token jwt
const verifyToken = async (token) => {
  try {
    let response;
    await jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) {
        response = "unauthorized";
      } else {
        const sessionData = await checkSession(decoded.sessionId);
        response = sessionData;
      }
    });
    return response;
  } catch (error) {
    return false;
  }
};

// verify token user
exports.verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //   console.log(token)
    if (!token) return sendResponse(res, message.errorAuthNotFound());
    const verify = await verifyToken(token);
    if (!verify)
      return sendResponse(
        res,
        message.errorUnauthorized({ message: "token not valid" })
      );
    if (verify === "unauthorized")
      return sendResponse(
        res,
        message.errorUnauthorized({ message: "unauthorized" })
      );
    if (verify === "invalid")
      return sendResponse(
        res,
        message.errorUnauthorized({
          message: "invalid token or please re login",
        })
      );
    req.AuthUser = verify;
    return next();
  } catch (error) {
    return sendResponse(res, message.errorServiceResponse(error));
  }
};
