const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_schema');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: 'fullName, email, password and role are required' });
    }

    // check existing email
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ fullName, email: email.toLowerCase().trim(), role, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while registering user' });
  }
};

// Login by email and password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error while logging in' });
  }
};

exports.verify = (req, res) => {
  return res.json({ ok: true, userId: req.userId });
};
