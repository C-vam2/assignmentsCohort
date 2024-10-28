//  start writing from here
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "ilovesunny";

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: "Unauthorized!!" });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized! No token provided" });
  }
};
module.exports = authMiddleware;
