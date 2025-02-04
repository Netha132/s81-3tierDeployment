const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const axiosClass = require("./models/axiosClass");

const signupRouter = require ("./Routes/SignupRouter");
const loginRouter = require("./Routes/LoginRouter")
const updateRouter = require("./Routes/UpdateRouter");
const deleteRouter = require("./Routes/DeleteRouter");

dotenv.config();

let app = express();
app.use("/uploads", express.static("uploads"));
app.use("/axiosClass",axiosClass);
app.use(cors());

let authorise = (req,res,next)=>{

  console.log("inside authorise mwf")
  console.log(req.headers["authorization"])

  next();
}

app.use(authorise);
app.use("/",signupRouter)
app.use("/loginRouter",loginRouter)
app.use("/validateToken",loginRouter);
app.use("/updateProfile",updateRouter)
app.use("/deleteProfile",deleteRouter);


app.listen(process.env.PORT || 2019, () => {
  console.log("Server running on port 2019");
});



let connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.dataBaseUrl);
    console.log("Connected To MongoDB");
  } catch (err) {
    console.log("Unable to connect to MongoDB");
  }
};
connectToMongoDB();
