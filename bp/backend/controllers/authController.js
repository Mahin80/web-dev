const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require('sequelize');
const resetTokens = {}; 
// Sign Up
exports.signup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone, address } = req.body;

    const isAdmin = email.endsWith('@bloompantry.com');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin,
      firstName,
      lastName,
      phone,
      address
    });

    res.status(201).json({
      message: 'User registered',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: username || null },
          { email: email || username || null }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      'secret-key',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token
    });

  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

// Admin Panel
exports.adminPanel = async (req, res) => {
  res.json({ message: 'Welcome to the admin panel!' });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // includes all fields
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user); // include address, phone, etc.
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update Default Address
exports.updateAddress = async (req, res) => {
  try {

    console.log("Decoded user from token:", req.user);
    console.log("New address:", req.body.address);

    const { address } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = address;
    await user.save();

    res.json({ message: 'Address updated' });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update address',
      error: err.message
    });
  }
};

const resetCodes = new Map(); 

exports.sendResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    resetCodes.set(email, code);

  
    return res.json({ message: 'Code generated', code }); // <-- only for demo
  } catch (err) {
    console.error('Error generating reset code:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    resetCodes.delete(email);

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

exports.verifyCode = (req, res) => {
  const { email, code } = req.body;
  const storedCode = resetCodes.get(email);

  if (storedCode && storedCode === code) {
    return res.json({ valid: true });
  } else {
    return res.status(400).json({ message: 'Invalid code' });
  }
};
