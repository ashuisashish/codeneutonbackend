const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) return res.status(400).json({ message: "Admin exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ username, email, password: hashedPassword });

  await newAdmin.save();
  res.status(201).json({ message: "Admin registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "90d" });
  res.json({ token });
};
