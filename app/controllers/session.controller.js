const Session = require('../models/session.model');

exports.createSession = async (req, res) => {
  try {
    const { userId, messages } = req.body;
    const session = new Session({ userId, messages });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMessage = async (req, res) => {
    console.log('saving this');
    try {
      const { content, type } = req.body;
      const session = await Session.findById(req.params.sessionId);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      session.messages.push({ content, type });
      await session.save();
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.getUserSessions = async (req, res) => {
    try {
      const sessions = await Session.find({ userId: req.params.userId });
      res.json(sessions);
    } catch (error) {
      console.error('Error fetching user sessions:', error); // Enhanced logging
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteSession = async (req, res) => {
    const { sessionId } = req.params;
  
    try {
      const deletedSession = await Session.findByIdAndDelete(sessionId);
      if (!deletedSession) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting session', error });
    }
  };
