const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Session = require('../models/session.model');


exports.allAccess = (req, res)=> {
    res.status(200).json("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).json("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).json("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).json("Moderator Content.");
};


exports.getAllUsersWithSessions = async (req, res) => {
    try {
      const users = await User.find().select('id username email'); // Adjust the fields you need
      const usersWithSessionCounts = await Promise.all(users.map(async (user) => {
        const sessionCount = await Session.countDocuments({ userId: user._id });
        return { ...user._doc, sessionCount }; // Assuming Mongoose, adjust if necessary
      }));
      res.status(200).json(usersWithSessionCounts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      await User.findByIdAndDelete(userId);
      await Session.deleteMany({ userId });
      res.status(200).json({ message: 'User and their sessions deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };