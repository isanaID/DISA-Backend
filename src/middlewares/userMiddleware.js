const jwt = require("jsonwebtoken");
const config = require("../config/config");
const timeHelpers = require("../helpers/timeHelper");
const message = require("../utils/responseWeb/index");
const sendResponse = require("../utils/responseWeb/responseHandler");
const SECRET = config.jwt.secret;
const { studentMiddlerware } = require("../apps/Students/auth/domains/index");
// check session in database
const checkSession = async (sessionId = null) => {
  try {
    const session = studentMiddlerware(sessionId);
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

exports.verifyStudent = async (req, res, next) => {
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
    //   if (!ROLE.includes(verify.userId.role)) return sendResponse(res,message.errorUnauthorized({message : 'You Are Not Authorized To Access This Page'}));
    req.studentAuth = verify;
    return next();
  } catch (error) {
    return sendResponse(res, message.errorServiceResponse(error));
  }
};
