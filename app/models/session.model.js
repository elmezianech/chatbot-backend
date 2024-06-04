const mongoose = require('mongoose');

// Define schema for chat messages
// Define schema for chat messages
const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    type: { type: String, enum: ['user', 'bot'], required: true }, // Use an enum to specify valid types
    timestamp: { type: Date, default: Date.now },
    // Other message fields as needed
  });

// Define schema for chat sessions
const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  messages: [messageSchema], // Array of messages within the session
  // Other session fields as needed
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
