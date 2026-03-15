const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Token not found" });
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await userService.findUserById(userId);
    req.user = user;
    if (!user) return res.status(404).send({ error: "User not found" });

  } catch (err) {
    console.error(err);
    const status = err.name === "TokenExpiredError" ? 401 : 500;
    return res.status(status).send({ error: err.message || "Internal Server Error" });
  }
  next();
};
module.exports = authenticate;
