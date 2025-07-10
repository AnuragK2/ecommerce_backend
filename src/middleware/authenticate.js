const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).send({ error: "Token not found" });
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    const user= await userService.findUserById(userId);
    req.user = user;
    if (!user) return res.status(404).send({ error: "User not found" });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: error.message || "Internal Server Error" });
  }
  next();
};
module.exports = authenticate;
