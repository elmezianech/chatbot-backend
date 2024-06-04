const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if(!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized !" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).then((user) => {
        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).json({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).json({ message: "Require Admin Role !" });
                return;
            }
        );
    }).catch((err) => {
        res.status(500).json({ message: err });
        return;
    });

};

isModerator = (req, res, next) => {
    User.findById(req.userId).then((user) => {
        Role.find(
            {
                _id: { $in: user.roles},
            },
            (err, roles) => {
                if (err) {
                    res.status(500).json({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }

                res.status(403).json({ message: "Require Moderator Role !" });
                return;
            }
        );
    }).catch((err) => {
        res.status(500).json({ message: err });
        return;
    });

};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};
module.exports = authJwt;
