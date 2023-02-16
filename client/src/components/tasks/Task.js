
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import "../../style/update.css"

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

  const taskObj =
  {
    "taskID": props.task_id,
    "taskName": props.task_name,
    "taskDesc": props.task_desc,
    "taskPoints": props.task_points,
    "targetDate": props.target_date,
    "completionDate": props.completion_date,
    "assignedName": props.full_name
  }

  return (
    <div className="userInfo">
        {show ?
          (
            <div>

            <div className="expanded-grid-container">


              <div className="expanded-grid-child-info">
                <h2><u>Task #{props.task_id}</u></h2>
                <p>Name: {props.task_name}</p>
                <p>Description: {props.task_desc}</p>
                <p>Points: {props.task_points}</p>
                <p>Target Date: {props.target_date}</p>
                <p>Completion Date: {props.completion_date}</p>
                <h4>Assigned: {props.full_name}</h4>
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