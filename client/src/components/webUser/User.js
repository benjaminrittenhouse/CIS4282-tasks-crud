
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import UpdateModal from "./updateModal"
import "../../style/update.css"

import DbToObj from "./DbToObj"

//This is a React Component that will be used to display the information of a SINGLE user.
//It will take in an propsect "props".
function User({ userData, shouldShow }) {

  const [show, setShow] = useState(shouldShow)
  const [modalVisibility, setModalVisibility] = useState("updateHide");

  function handleShow() {
    setShow(!show);
  }

  // hide / show modal
  function handleUpdate() {
    if (modalVisibility == "updateShow") {
      setModalVisibility("updateHide");
    } else {
      setModalVisibility("updateShow");
    }
  }

  useEffect(() => {
  });

  /*const userObj =
  {
    "webUserId": userData.web_user_id,
    "userEmail": userData.user_email,
    "firstName": userData.first_name,
    "lastName": userData.last_name,
    "userPassword": userData.user_password,
    "userPassword2": userData.user_password,
    "image": userData.image,
    "birthday": userData.birthday,
    "membershipFee": userData.membership_fee,
    "roomNumber": userData.room_number,
    "userRoleId": userData.user_role_id,
  }*/

  const userObj = DbToObj(userData);


  return (
    <div className="userInfo">
      {show ?
        (

          <div> {/* EXPANDED USER (RIGHT SIDE) */}

            <div className={modalVisibility}>
              <UpdateModal props={userData} setModalVisibility={setModalVisibility} />
            </div>

            <div className="expanded-grid-container">

              <div className="expanded-grid-child-info">
                <img className="imageThumb" src={userObj.image} alt="not found" />
                <h2>{userObj.firstName + " " + userObj.lastName}</h2>
                <p>Email: {userObj.userEmail}</p>
                <p>Password: {userObj.userPassword}</p>
                <p>Membership Fee: {userObj.membershipFee}</p>
                <p>Room #: {userObj.roomNumber}</p>
                <p>Birthday: {userObj.birthday}</p>
                {/* Roletype converted to string */}
                <h4>Role: {userData.role_type}</h4>
              </div>

              <div className="expanded-grid-child-buttons">
                <button onClick={handleUpdate} className="editButton">Edit</button>
                <button onClick={handleUpdate} className="editButton">Delete</button>
              </div>
            </div>

          </div>
        )

        :

        (
          <div> {/* COLLAPSED USER (LEFT SCROLL) */}

            <div className={modalVisibility}>
              <UpdateModal props={userData} setModalVisibility={setModalVisibility} />
            </div>
            <div className="collapsed-grid-container">
              <div className="collapsed-grid-child-email">
                <img className="imageThumb" src={userData.image} alt="not found" />
                <button onClick={handleUpdate} className="editButton">Edit</button>
                <p>{userData.first_name + " " + userData.last_name}</p>
                <p>{userData.user_email}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  )
} //End User

export default User;