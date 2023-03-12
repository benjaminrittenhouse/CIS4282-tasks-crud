import React, {useState} from 'react';
import { Avatar, Box, IconButton, Typography, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DbToObj from '../DbToObj';
import './TaskBox.css';

import ConfirmDeleteModal from '../delete/ConfirmDeleteModal';


function TaskBox({taskData, setExpandedTask, setIsEditing, processDelete, index}) {

  const taskObj = DbToObj(taskData);

  function handleEdit(){
      setIsEditing(true)
  }

  async function handleDelete() {
    console.log("deleting: " + taskObj.taskID + " at " + index);
    await processDelete(taskObj.taskID, index);
  }

  function handleClickDelete(){
     setIsDeleteModal(true)
  }

  function handleClick() {
      console.log("task:")
      console.dir(taskObj)
      setExpandedTask(taskObj)
  }

  const [isDeleteModal, setIsDeleteModal] = useState(false)

  function handleClose(){
      setIsDeleteModal(false)
  }

  return (
      <Box onClick={handleClick} className="taskBox" display="flex" alignItems="center" justifyContent="space-between" p={2}>
        
        <ConfirmDeleteModal  open={isDeleteModal} handleClose={handleClose} handleDelete={handleDelete} name={taskObj.taskName}/>

        <Box display="flex" alignItems="center">
          <Avatar src={taskObj.image} alt={`${taskObj.name}'s picture`} />
          <Box ml={2}>
            <Typography variant="h6">{taskObj.taskName}</Typography>
          </Box>
        </Box>
        <Box ml="auto">
          <IconButton aria-label="edit" onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleClickDelete}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
  );
};

export default TaskBox;
