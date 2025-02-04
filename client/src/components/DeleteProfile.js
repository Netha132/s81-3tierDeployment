import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import   axios from "axios";
import { useNavigate } from 'react-router-dom';


function DeleteProfile() {

  let navigate = useNavigate();

  let userDetails=useSelector((store)=>{
    return store.userDetails;
  })

  useEffect(()=>{
    axios.defaults.baseURL="http://localhost:2019";
  },[])

  let deleteProfile = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",userDetails.email);

    let response = await axios.delete("/deleteProfile/deleteProfile",{data:dataToSend});

    console.log(response.data)
    alert(response.data.msg)
    if(response.data.status == "success"){
      navigate("/")
    }

  }
  return (
    <div className='deleteProfileContainer'>
      <div className='deleteProfileDiv'>
        <img className='errorIcon' src='./images/error.png' alt=''></img>
    <h4>Are you sure want to delete ?</h4>
        <div className='deleteButtonDiv'>
            <button className='yesBtn' type='button' onClick={()=>{
              deleteProfile();
            }}>Yes</button>
            <button className='noBtn'>No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProfile
