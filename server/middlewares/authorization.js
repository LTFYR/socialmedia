const User = require("../models/user");
const jwt = require("jsonwebtoken");

authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ msg: "You are not authenticated" });
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!decode)
      return res.status(400).json({ msg: "You are not authenticated" });
    const user = await User.findById({ _id: decode.id });

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authorize;
