const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
      const { username, email, password, roles } = req.body;
  
      console.log("Received signup request with:", { username, email, password, roles });
  
      // Create new user with hashed password
      const user = new User({
        username,
        email,
        password: bcrypt.hashSync(password, 8),
      });
  
      // Save user to the database
      await user.save();
  
      console.log("User saved successfully");
  
      if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        user.roles = foundRoles.map(role => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        user.roles = [role._id];
      }
  
      await user.save();
      console.log("User roles saved successfully");
  
      res.status(201).json({ message: "User was registered successfully" });
    } catch (err) {
      console.error("Error in signup:", err);
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("Received signin request with:", { email, password });
  
      // Find user by email
      const user = await User.findOne({ email }).populate("roles", "-__v");
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User Not found." });
      }
  
      // Check if password is valid
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        console.log("Invalid password");
        return res.status(401).json({ message: "Invalid Password!" });
      }
  
      console.log("User authenticated successfully");
  
      /// Get authorities
      const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

      // Generate token with roles
      const token = jwt.sign({ id: user.id, roles: authorities }, config.secret, { expiresIn: 86400 }); // 24 hours
  
      console.log("Sending response with token:", token);
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } catch (err) {
      console.error("Error in signin:", err);
      res.status(500).json({ message: err.message });
    }
  };
  
  
  
  exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



