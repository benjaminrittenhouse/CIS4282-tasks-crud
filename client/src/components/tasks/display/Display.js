import React, { useState, useEffect } from "react";
import TaskDetail from "../taskDetail/TaskDetail";
import "./displayView.css"
import "../../tasks/taskList/TaskList.css"
import TaskList from "../taskList/TaskList";
import Edit from "../edit/Edit"
import "../../../style/navbar.css";
import "../../../style/style.css"
import "../../../style/edit.css"
import DbToObj from "../DbToObj";

function Display(props) {

  //used to store the JS Object that comes from the API call
  const [taskList, setTaskList] = useState([]);

  const [viewing, setViewing] = useState(false);

  const [isEditing, setIsEditing] = useState(false);


  const [expandedTask, setExpandedTask] = useState({})

  async function fetchAllTasks() {
    try {

      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/listAllTasks"
      );

      const data = await res.json();

      setTaskList(data);
      console.log("data: ")
      console.dir(data);
      setExpandedTask(DbToObj(data[0]))
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
        setExpandedTask(DbToObj(taskList[0]))
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (

    <div className={`displayView ${viewing}`}>

      {/* Scrollable Task List */}
      <div className="scrollableContainer">
        <div className="taskListContainer">
          <TaskList expandedTask={expandedTask} processDelete={processDelete} setViewing={setViewing} tasks={taskList} setExpandedTask={setExpandedTask} setIsEditing={setIsEditing} />
        </div>
      </div>

      {/* Expanded Task View */}
      <div className={`expandedTaskView ${viewing}`}>
      {isEditing ? <Edit props={expandedTask} setIsEditing={setIsEditing} /> : <TaskDetail setViewing={setViewing} taskData={expandedTask} />}
      </div>

    </div>

  );
} // end of Display() function

export default Display;
