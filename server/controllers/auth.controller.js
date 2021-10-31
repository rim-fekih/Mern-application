const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { constant } = require("lodash");


exports.get = async (req, res) =>{
  res.send(await User.find());
}

exports.addIcon =  async (req,res) => {
  const user =  await User.findById(req.params.id);
  //console.log(req.file);
  if(req.file)
  {
    user.icon = await req.file.filename;
    await user.save();
  }
  res.send(user);
};

exports.signup =  async (req, res) => {
  const salt = await bcrypt.genSaltSync(8);
  const password = await req.body.password;
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(password, salt),
    role: req.body.role,
    phone: req.body.phone,
    pastryType: req.body.pastryType,
    pastryDescription: req.body.pastryDescription,
    JoinDate : req.body.JoinDate,
    visible : "visible"
  });

   await user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        //  user.roles = [role._id];
         user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
            res.send(user);
           //res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      /*var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      } */
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        /*roles: authorities, */
        role: user.role,
        accessToken: token,
      });
    });
};
