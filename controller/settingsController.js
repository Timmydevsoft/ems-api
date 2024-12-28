import User from "../model/User.js";
import bcrypt from "bcrypt";
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword, id } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword || !id) {
      return res.status(400).json({ message: "Bad request" });
    }
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );
    if (updated) {
      res.status(201).json({ message: "Password Updated sucessful" });
    } else {
      res.status(401).json({ message: "Not sucessful" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { changePassword };
