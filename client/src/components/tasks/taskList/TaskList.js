import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import TaskBox from "./TaskBox"
import "../taskList/TaskList.css"

const TaskList = ({ tasks, expandedTask, setExpandedTask, setIsEditing, processDelete }) => {

  console.log("expanded task:")
  console.dir(expandedTask)

  return (
    <List className="taskList">
      {tasks.map((task, index) => (
          <TaskBox index={index} processDelete={processDelete} taskData={task} setExpandedTask={setExpandedTask} setIsEditing={setIsEditing} />
      ))}
    </List>
  );
};

export default TaskList;
