const User = require("../server/models/User");
const jwt = require("jsonwebtoken");
async function jwtCheck(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not Autheriesed , Not Token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
}
module.exports = jwtCheck;
