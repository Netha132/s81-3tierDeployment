import React from "react";
import TopNavigations from "./TopNavigations";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  let userDetails = useSelector((store) => {
    return store.userDetails;
  });
  return (
    <div>
      <TopNavigations />

    <div className="profileDetailsDiv">
      <div className="accountDetails">
        <h2>
          {userDetails.firstName} {userDetails.lastName}
        </h2>
        <h3>{userDetails.email}</h3>
        <h4>{userDetails.mobile}</h4>
      </div>

    
      <div className="profilePicDiv">
        <img className="profileImg" src={`/${userDetails.profile}`} alt=""></img>
      </div>

      </div>

    <div className="editProfileDiv">
      <img className="updateProfileIcon" src="./images/updateProfile.png" alt=""></img>
      <Link className="editProfileLink" to="/editprofile">EditProfile</Link>
    </div>
      
      <div className="deleteProfileLinkDiv">
        <img className="deleteProfileIcon" src="./images/delete.png" alt=""></img>
        <Link className="deleteProfileLink" to="/deleteprofile">Delete Account</Link>
      </div>
    </div>
  );
}

export default Profile;
