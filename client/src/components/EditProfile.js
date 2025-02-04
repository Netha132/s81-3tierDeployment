import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let genderInputRef = useRef();
  let emailInputRef = useRef();
  let mobileInputRef = useRef();
  let passwordInputRef = useRef();
  let profileInputRef = useRef();

  let [profile, setProfile] = useState("./images/no-pic3.png");

  let userDetails = useSelector((store) => {
    return store.userDetails;
  });

  useEffect(() => {
    console.log("User Details:", userDetails); // Debugging
    axios.defaults.baseURL = "http://localhost:2019";

    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

      firstNameInputRef.current.value = userDetails.firstName || "";
      lastNameInputRef.current.value = userDetails.lastName || "";
      ageInputRef.current.value = userDetails.age || ""; // Fallback for undefined
      genderInputRef.current.value = userDetails.gender || "";
      emailInputRef.current.value = userDetails.email || "";
      mobileInputRef.current.value = userDetails.mobile || ""; // Fallback for undefined
      setProfile(userDetails.profile ? `http://localhost:2019/${userDetails.profile}` : "./images/no-pic3.png");

  }, []);

  let onUpdateProfile = async () => {

    let age = parseInt(ageInputRef.current.value);
    let mobile = parseInt(mobileInputRef.current.value);
  
    if (isNaN(age) || isNaN(mobile)) {
      alert("Please enter valid values for age and mobile.");
      return;
    }

    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("gender", genderInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value)

    if (profileInputRef.current.files.length > 0) {
        dataToSend.append("profile", profileInputRef.current.files[0]);
      }

    let response = await axios.patch(
      "/updateProfile/updateProfile",
      dataToSend
    );

    console.log(response.data);
    alert(response.data.msg);

    if (response.data.status == "success") {
      // dispatch({ type: "login", data: response.data.data });
      navigate("/");
    }
  };
  return (
    <div>
      <form className="editProfileFrom">
        <h2>Update Profile</h2>
        <div className="editProfileInputDiv">
          <input
            ref={firstNameInputRef}
            className="editProfileInput animeInput1"
            type="text"
            placeholder="First Name"
          ></input>
        </div>
        <div className="editProfileInputDiv">
          <input
            ref={lastNameInputRef}
            className="editProfileInput animeInput2"
            type="text"
            placeholder="Last Name"
          ></input>
        </div>
        <div className="editProfileInputDiv">
          <input
            ref={ageInputRef}
            className="editProfileInput animeInput3"
            type="number"
            placeholder="Age"
          ></input>
        </div>
        <div className="editProfileInputDiv">
          <input
            ref={genderInputRef}
            className="editProfileInput animeInput4"
            type="text"
            placeholder="Gender"
          ></input>
        </div>
        <div className="editProfileInputDiv">
          <input
            ref={emailInputRef}
            className="editProfileInput animeInput5"
            type="email"
            placeholder="Email"
            readOnly
          ></input>
        </div>
        <div className="editProfileInputDiv">
          <input
            ref={mobileInputRef}
            className="editProfileInput animeInput6"
            type="number"
            placeholder="Phone"
          ></input>
        </div>
        <div className="editProfileInputDiv">
          <input
            ref={passwordInputRef}
            className="editProfileInput animeInput7"
            type="text"
            placeholder="Password"
          ></input>
        </div>
        <div className="editProfileInputDiv">
          <input
            ref={profileInputRef}
            className="editProfileInput animeInput8"
            type="file"
            onChange={(event) => {
              let selectedProfile = URL.createObjectURL(event.target.files[0]);
              setProfile(selectedProfile);
            }}
          ></input>
        </div>

        <div>
          <img className="updateProfilePic" src={profile} alt=""></img>
        </div>

        <button
          className="updateBtn"
          onClick={() => {
            onUpdateProfile();
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
