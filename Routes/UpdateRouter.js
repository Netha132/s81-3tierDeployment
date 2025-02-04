const express = require("express");
const multer = require("multer");
const axiosClass = require("../models/axiosClass");
const bcrypt = require("bcrypt")

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

router.patch("/updateProfile", upload.single("profile"), async (req,res) => {
 

  // res.json({msg:"dummy data"})
//   console.log(req.file);
//   let user = await axiosClass.find({email:req.body.email})

   try {
    console.log(req.body);
    console.log(req.file)

     if (req.body.firstName.trim().length > 0) {
       await axiosClass.updateMany(
         { email: req.body.email },
         { firstName: req.body.firstName }
       );
     }

     if(req.body.lastName.trim().length > 0){
         await axiosClass.updateMany(
             {email:req.body.email},
             {lastName:req.body.lastName}
         )
     }

     if(req.body.age > 0){
         await axiosClass.updateMany(
             {email:req.body.email},
             {age:req.body.age}
         )
     }

     if(req.body.gender.trim().length > 0){
         await axiosClass.updateMany(
             {email:req.body.email},
             {gender:req.body.gender}
         )
     }

     if(req.body.mobile.trim().length > 0){
         await axiosClass.updateMany(
             {email:req.body.email},
             {mobile:req.body.mobile}
         )
     }

     if(req.body.password.length >0){
      let hashedPassword = await bcrypt.hash(req.body.password,10);
         await axiosClass.updateMany(
             {email:req.body.email},
             {password:hashedPassword}
         )
     }

     if(req.file){
         await axiosClass.updateMany(
             {email:req.body.email},
             {profile:req.file.path}
         )
     }

     res.json({msg:"Profile updated successfully",status:"success"})
   } catch (err) {
    console.log("error",err)
     res.json({msg:"Unable to update profile",status:"failed",err:err})
   }
 }
);
module.exports = router;