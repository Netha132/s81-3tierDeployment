import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function TopNavigations() {
  let navigate = useNavigate();

  let userDetails = useSelector((store) => {
    return store.userDetails;
  });
  useEffect(() => {
    if (userDetails.email) {
    } else {
      navigate("/");
    }
  }, []);
  return (
    <nav className="navBar">
      <Link className="navLinks" to="/news">
        News
      </Link>
      <Link className="navLinks" to="/tools">
        Tools
      </Link>
      <Link className="navLinks" to="/support">
        Support
      </Link>
      <Link className="navLinks" to="/profile">
        Profile
      </Link>
    </nav>
  );
}

export default TopNavigations;
