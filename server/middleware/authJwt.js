const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isSuperAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role },
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        {
          if (user.role === "superadmin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require SuperAdmin Role!" });
        return;
      }
    );
  });
};

isPastry = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role },
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        {
          if (user.role === "pâtisserie") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Pastry Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isSuperAdmin,
  isPastry,
};
module.exports = authJwt;
