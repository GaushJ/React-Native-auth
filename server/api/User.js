const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//mongodb user model
const User = require("../models/userSchema");
//Signup
router.post("/signup", (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.json({
      status: "FAILED",
      message: "Empty Input Fields",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  } else if (password.length < 4) {
    res.json({
      status: "FAILED",
      message: "Password is too short",
    });
  } else {
    //checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "SUCCESS",
            message: "Email already exists",
          });
        } else {
          //Creating a new user

          //password hashing
          const saltRounds = 12;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                username,
                email,
                password: hashedPassword,
              });
              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "User successfully created",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "User did not register successfully",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "Erro occurred while hashing password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "ERROR OCCURRED",
        });
      });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Please input the credentials",
    });
  } else {
    //Check if user exist
    User.find({ username }).then((data) => {
      if (data.length) {
        //User Exists

        const hashedPassword = data[0].password;
        bcrypt
          .compare(password, hashedPassword)
          .then((result) => {
            if (result) {
              res.json({
                status: "SUCCESS",
                message: "Signin successful",
                data: data,
              });
            } else {
              res.json({
                status: "FAILED",
                message: "Signin unsuccessful",
              });
            }
          })
          .catch(err => {
            res.json({
              status:"FAILED",
              message:"Error occurred while comparing password",
              data:data
            })
          });
      }else{
        res.json({
          status:"FAILED",
          message:"Invalid credentials",
          data:data
        })
      }
    }).catch(err => {
        res.json({
          status:"FAILED",
          message:"An error has occurred while checking for existing users"
        })
    })
  }
});

module.exports = router;
