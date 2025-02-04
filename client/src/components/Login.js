import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  let emailInputRef= useRef();
  let passwordInputRef= useRef();

  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(()=>{
    axios.defaults.baseURL="";
    if(localStorage.getItem("token")){
      // onvalidateToken();
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    }
  },[])

  let onLogin=async()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);

    let response = await axios.post("/loginRouter/login",dataToSend)

    console.log(response.data.msg)
    alert(response.data.msg)
    if(response.data.status == "success"){
      localStorage.setItem("token",response.data.data.token);
      
      navigate("/news");
      dispatch({type:"login",data:response.data.data})
    }
  }


  let onvalidateToken = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("token",localStorage.getItem("token"))

    let validateResponse = await axios.post("/validateToken/validateToken",dataToSend)

    console.log(validateResponse.data.msg)

    if(validateResponse.data.status == "success"){
      alert(validateResponse.data.msg);
      navigate("/news");
      dispatch({type:"login",data:validateResponse.data.data})

    }
  }

  return (
    <div>
        <div className="loginBG">
          
      <form className="loginForm">
        <h2>Login</h2>
        <div className="loginDiv">
          <input ref={emailInputRef} className="loginInput" type="text" placeholder="Email"></input>
        </div>
        <div className="loginDiv">
          <input ref={passwordInputRef} className="loginInput" type="password" placeholder="Password"></input>
        </div>

        <button className="loginBtn" type="button" onClick={()=>{
          onLogin();
        }}>Login</button>

        <p>Don't have an account?<Link to="/signup" style={{color:"#fff"}}>Sign up</Link></p>
        
      </form>

      
      </div>
    </div>
  );
}

export default Login;
