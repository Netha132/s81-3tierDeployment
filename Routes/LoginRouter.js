const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axiosClass = require("../models/axiosClass")

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

  router.post("/login",upload.none(),async(req,res)=>{
    console.log(req.body);

    let user = await axiosClass.find().and({email:req.body.email});

    

    if(user.length > 0){
      let isPasswordCorrect = await bcrypt.compare(req.body.password,user[0].password)
        if(isPasswordCorrect == true){
          let token = jwt.sign({email:req.body.email,password:req.body.password},"vivek")
            let dataToSend={
                firstName:user[0].firstName,
                lastName:user[0].lastName,
                age:user[0].age,
                gender:user[0].gender,
                email:user[0].email,
                mobile:user[0].mobile,
                profile:user[0].profile,

                token:token
            }
            res.json({msg:"Login Successfully",status:"success",data:dataToSend})
        }else{
            res.json({msg:"Login Failed",status:"Failure"})
        }
    }else{
        res.json({msg:"User not registered",status:"failure"})
    }
  })


  router.post("validateToken",upload.none(),async(req,res)=>{
    console.log(req.body);
    let dcryptCredintials =  jwt.verify(req.body.token,"vivek");
    console.log(dcryptCredintials)

    let user = await axiosClass.find().and({email:dcryptCredintials.email})

    if(user.length > 0){
      if(user[0].password == dcryptCredintials.password){
        let dataToSend={
          firstName:user[0].firstName,
          lastName:user[0].lastName,
          age:user[0].age,
          gender:user[0].gender,
          email:user[0].email,
          mobile:user[0].mobile,
          profile:user[0].profile
        }
        res.json({msg:"Login successfully", status:"success"})
      }else{
        res.json({msg:"Incorrect password",status:"failure"})
      }
    }
    else{
      res.json({msg:"User not registered", status:"failure"})
    }
  })


module.exports=router;