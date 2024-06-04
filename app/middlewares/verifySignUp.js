const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log("Checking for duplicate username or email...");
    console.log("Request body:", req.body);
  
    const promises = [
      User.findOne({ username: req.body.username }),
      User.findOne({ email: req.body.email })
    ];
  
    Promise.all(promises)
      .then(results => {
        console.log("Results:", results);
        if (results[0]) {
          console.log("Username is already in use");
          res.status(400).json({ message: "Failed! Username is already in use!" });
          return;
        }
  
        if (results[1]) {
          console.log("Email is already in use");
          res.status(400).json({ message: "Failed! Email is already in use!" });
          return;
        }
  
        console.log("No duplicates found, proceeding to next middleware");
        next();
      })
      .catch(err => {
        console.log("Error:", err);
        res.status(500).json({ message: err.message });
      });
  };
  
  checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).json({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
      }
    }
  
    next();
  };
  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
  };
  
  module.exports = verifySignUp;
