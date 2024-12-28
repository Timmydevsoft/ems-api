import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv"

// @ create new uers account
const createUser = async (req, res) => {
  const { name, mail, password, role } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);
  try {
    const create = await User.create({
      name,
      mail,
      password: hashedPassword,
      role,
    });
    if (!create) {
      res.json({ message: "error creating records" });
    }
    create.save();
    res.status(200).json({ message: "Craeted successfuly" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Error creating record" });
  }
};

// @private
const Login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.status(400).json({ message: "Bad request" });
    }

    const available = await User.findOne({ mail });
    if (!available) {
      return res.status(404).json({ mesage: "User not found" });
    }
    const isMatched = await bcrypt.compare(password, available.password);
    if (available && isMatched) {
      const token = jwt.sign(
        { id: available._id, role: available.role, name: available.name },
        process.env.ACCESS_KEY,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { id: available.id, role: available.role },
        process.env.REFRESH_SECRET
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 100,
      });

      res.status(200).json({
        name: available.name,
        role: available.role,
        id: available._id,
        accessToken: token,
      });
    } else {
      res.status(401).json({ message: "Invalid or wrong password" });
    }
  } catch (err) {
    console.log(err);
  }
};

const verify = async (req, res) => {
  res.status(200).json({ user: req.user, success: true });
};
export { Login, createUser, verify };

// export default  login
