
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import "../../style/update.css"

import DbToObj from "./DbToObj"

import UpdateModal from "./updateModal"

function Task({ props }) {

  const [show, setShow] = useState(false)
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

  const taskObj = DbToObj(props);

  return (
    <div className="userInfo">
      {show ?
        (
          <div>

            <div className={modalVisibility}>
              <UpdateModal props={taskObj} setModalVisibility={setModalVisibility} assignedUser={props.first_name + " " + props.last_name} />
            </div>
            <div className="expanded-grid-container">


              <div className="expanded-grid-child-info">
                <h2><u>Task #{props.task_id}</u></h2>
                <p>Name: {props.task_name}</p>
                <p>Description: {props.task_desc}</p>
                <p>Points: {props.task_points}</p>
                <p>Target Date: {props.target_date}</p>
                <p>Completion Date: {props.completion_date}</p>
                <h4>Assigned: {props.first_name + " " + props.last_name}</h4>
              </div>

              <div className="expanded-grid-child-buttons">
                <button onClick={handleShow}>Collapse</button>
                <button onClick={handleUpdate} className="editButton">Edit</button>
              </div>

            </div>

          </div>
        )
        :
        (
          <div>

            <div className={modalVisibility}>
              <UpdateModal props={taskObj} setModalVisibility={setModalVisibility} assignedUser={props.first_name + " " + props.last_name} />
            </div>

            <div className="expanded-grid-container">


              <div className="expanded-grid-child-info">
                <h2><u>Task #{props.task_id}</u></h2>
                <p>Name: {props.task_name}</p>
                <p>Points: {props.task_points}</p>
              </div>

              <div className="expanded-grid-child-buttons">
                <button onClick={handleShow}>View</button>
                <button onClick={handleUpdate} className="editButton">Edit</button>
              </div>

            </div>

          </div>
        )
      }

    </div>
  )
}

export default Task;