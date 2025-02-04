import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let genderInputRef = useRef();
  let emailInputRef = useRef();
  let mobileInputRef = useRef();
  let passwordInputRef = useRef();
  let profileInputRef = useRef();

  let navigate = useNavigate();

  useEffect(()=>{
    axios.defaults.baseURL="http://localhost:2019";

    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
  })

  let onSignup = async () => {
    let dataToSend = new FormData();

    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("gender",genderInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    for (let i = 0; i < profileInputRef.current.files.length; i++) {
      dataToSend.append("profile", profileInputRef.current.files[i]);
    }

    // let reqOptions = {
    //   method: "POST",
    //   body: dataToSend,
    // };

    // let JSONData = await fetch("/signup", reqOptions);

    // let JSOData = await JSONData.json();

    // console.log(JSOData);
    // alert(JSOData.msg);

    let response = await axios.post("/signup",dataToSend);

    console.log(response)
    alert(response.data.msg)
    if(response.data.status == "success"){
      navigate("/news")
    }
  };

  return (
    <div>
      <div className="signupBG">
        <form className="signupForm">
          <h2>Signup</h2>
          <div className="signupDiv">
            <input
              ref={firstNameInputRef}
              className="signupInputs"
              type="text"
              placeholder="First Name"
            ></input>
          </div>

          <div className="signupDiv">
            <input
              ref={lastNameInputRef}
              className="signupInputs"
              type="text"
              placeholder="Last Name"
            ></input>
          </div>

          <div className="signupDiv">
            <input
              ref={ageInputRef}
              className="signupInputs"
              type="number"
              placeholder="Age"
            ></input>
          </div>
          <div>
            <select ref={genderInputRef} name="gender" className="selectGender">
              <option className="genderOption" value="gender">
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="signupDiv">
            <input
              ref={emailInputRef}
              className="signupInputs"
              type="email"
              placeholder="Email"
            ></input>
          </div>

          <div className="signupDiv">
            <input
              ref={mobileInputRef}
              className="signupInputs"
              type="number"
              placeholder="Mobile Number"
            ></input>
          </div>

          <div className="signupDiv">
            <input
              ref={passwordInputRef}
              className="signupInputs"
              type="password"
              placeholder="Create Password"
            ></input>
          </div>
          
          <div className="signupDiv">
            <input
              ref={profileInputRef}
              type="file"
              className="signupInputs"
            ></input>
          </div>

          <button
            type="button"
            className="signupBtn"
            onClick={() => {
              onSignup();
            }}
          >
            Signup
          </button>

          <p>
            Already have an account?
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
