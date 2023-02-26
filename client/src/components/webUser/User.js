
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import UpdateModal from "./updateModal"
import "../../style/update.css"

//This is a React Component that will be used to display the information of a SINGLE user.
//It will take in an propsect "props".
function User({ props, shouldShow }) {

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

  const userObj =
  {
    "webUserId": props.web_user_id,
    "userEmail": props.user_email,
    "firstName": props.first_name,
    "lastName": props.last_name,
    "userPassword": props.user_password,
    "userPassword2": props.user_password,
    "image": props.image,
    "birthday": props.birthday,
    "membershipFee": props.membership_fee,
    "roomNumber": props.room_number,
    "userRoleId": props.user_role_id,
  }


  return (
    <div className="userInfo">
      {show ?
        (
          <div>

            <div className={modalVisibility}>
              <UpdateModal props={userObj} setModalVisibility={setModalVisibility}/>
            </div>

            <div className="expanded-grid-container">

              <div className="expanded-grid-child-info">
                <img className="imageThumb" src={props.image} alt="not found" />
                <h2>{props.first_name + " " + props.last_name}</h2>
                <p>Email: {props.user_email}</p>
                <p>Password: {props.user_password}</p>
                <p>Membership Fee: {props.membership_fee}</p>
                <p>Room #: {props.room_number}</p>
                <p>Birthday: {props.birthday}</p>
                <h4>Role: {props.role_type}</h4>
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
          <div>
            <div className={modalVisibility}>
              <UpdateModal props={userObj} setModalVisibility={setModalVisibility}/>
            </div>
            <div className="collapsed-grid-container">
              {/*image*/}
        

              {/*information*/}
              <div className="collapsed-grid-child-email">
              <img className="imageThumb" src={props.image} alt="not found" />
                <p>{props.first_name + " " + props.last_name}</p>
                <p>{props.user_email}</p>
              </div>

              <div className="collapsed-grid-child-buttons">
                {/*<button onClick={handleShow}>View</button>*/}
                {/*<button className="editButton"><Link to="/update" state={{ data: userObj }}>Edit</Link></button>*/}
                {/*<button onClick={handleUpdate} className="editButton">Edit</button>*/}
              </div>

            </div>
          </div>
        )}
    </div>
  )
} //End User

export default User;