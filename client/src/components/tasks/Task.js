
/*import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import UpdateModal from "./webUser/updateModal"
import "../style/update.css"

function Task({ props }) {

  const [show, setShow] = useState(false)
  const [modalVisibility, setModalVisibility] = useState("updateHide");

  function handleShow() {
    setShow(!show);
  }


  useEffect(() => {
  });

  const userObj =
  {
    "taskID": props.task_id,
    "taskName": props.task_name,
    "taskDesc": props.task_desc,
    "taskPoints": props.task_points,
    "taskAssigned": props.task_assigned
  }

  return (
    <div className="userInfo">

          <div>

            <div className="expanded-grid-container">

              <div className="expanded-grid-child-image">
                <img className="imageThumb" src={props.image} alt="not found" />
              </div>

              <div className="expanded-grid-child-info">
                <h2><u>User {props.web_user_id}</u></h2>
                <p>Email: {props.user_email}</p>
                <p>Password: {props.user_password}</p>
                <p>Membership Fee: {props.membership_fee}</p>
                <p>Room #: {props.room_number}</p>
                <p>Birthday: {props.birthday}</p>
                <h4>Role: {props.role_type}</h4>
              </div>

              <div className="expanded-grid-child-buttons">
                <button onClick={handleShow}>Collapse</button>
                <button onClick={handleUpdate} className="editButton">Edit</button>
              </div>
            </div>

          </div>
          </div>
        )

export default Task;*/