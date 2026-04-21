import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).json("User not found");

  res.json(user);
};