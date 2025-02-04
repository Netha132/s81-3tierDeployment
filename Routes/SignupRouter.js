const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");

const axiosClass = require("../models/axiosClass");

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });

  router.post("/signup", upload.single("profile"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let hashedPassword = await bcrypt.hash(req.body.password,10)
    try {
      let user = new axiosClass({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashedPassword,
        profile: req.file.path,
      });
      await axiosClass.insertMany([user])
      // await user.save();
  
      res.json({ msg: "User Created", status: "success" });
    } catch (err) {
      res.json({ msg: "Unable to create user", status: "failure", err: err });
    }
  });


module.exports=router;