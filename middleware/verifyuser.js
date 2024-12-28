import User from "../model/User.js";
import jwt from "jsonwebtoken";
const veryfyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorizaion;
    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_KEY, async (err, decoded) => {
        if (err) {
          res.status(401).json(err.message);
        } else {
          const user = await User.findById(decoded.id);
          if (user) {
            req.id = decoded.id;
            req.user = user;
            next();
          } else {
            res.status(401).json({ message: "Invalid or Unauyhorized user" });
          }
        }
      });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server side error" });
  }
};

export default veryfyUser;
