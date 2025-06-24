const {Message} = require('../models');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['timestamp', 'DESC']] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};

exports.createMessage = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error saving message', error: err.message });
  }
};
