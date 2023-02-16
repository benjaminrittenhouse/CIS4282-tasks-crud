import React, {useState, useEffect} from "react";
import DeleteModal from "../webUser/DeleteModal.js";

import Task from './Task'

import "../../style/user/collapsed-user.css";
import "../../style/user/expanded-user.css";
import "../../style/navbar.css";
import "../../style/style.css"
import "../../style/user/user-table.css"
import "../../style/update.css"
import "../../style/modalWindow.css"



function Display(props) {

  const [taskList, setTaskList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  const [okClicked, setOkClicked] = useState(false);
  const [clickIndex, setClickIndex] = useState();


  async function fetchAllTasks() {
    try {

      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/listAllTasks"
      );

      const data = await res.json();

      setTaskList(data);
    } catch (err) {

      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllTasks();
  }, []);
  

  const [taskID, setTaskID] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setTaskID(value);
  };

  async function processDelete(taskID, index) {

    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/deleteTask/" + taskID
      );

      const data = await res.json();
      console.log(data);

      if (data.errorMsg.length > 0) {
        console.log("Could not delete task " + taskID + "!");
      } else {
        console.log("index: " + index);

        var newList = taskList;
        newList.splice(index, 1);
        setTaskList([...newList]);
      }
    } catch (err) {
      console.log(err);
    }
    setOpenModal(false)
  }

  return (
    <div className="view">
      <div className="main">
        <h2 className="heading">Task Display</h2>
        <div className="userTable">
          <div className="tableBody">
            {taskList.length > 0 ? (
              taskList.map((ele, index) => (
                <div key={index} className="userBlock">
                  <Task props={ele} />
                  <button
                    class="deleteButton"
                    onClick={() => {
                      setOpenModal(true);
                      setClickedTask(ele);
                      setClickIndex(index);
                    }}
                  >
                    Delete
                  </button>                  
                </div>
              ))
            ) : (
              <div>
                <p>No Tasks Found</p>
              </div>
            )}
            </div>
            <DeleteModal
            onOkClicked={() => {
              setOkClicked(true);
              processDelete(clickedTask.task_id, clickIndex);
            }}
            onClose={() => {
              setOpenModal(false);
              setOkClicked(false);
            }}
            open={openModal}
            user={clickedTask}
          /> 
        </div>
      </div>
    </div>
  );
} // end of Display() function

export default Display;
