import React, {useState} from 'react';
import { Avatar, Box, IconButton, Typography, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DbToObj from '../DbToObj';
import './UserBox.css';

import ConfirmDeleteModal from '../delete/ConfirmDeleteModal';


function UserBox({ userData, setExpandedUser, setIsEditing, processDelete, index}) {

  const userObj = DbToObj(userData);

  function handleEdit(){
      setIsEditing(true)
  }

  async function handleDelete() {
    console.log("deleting: " + userObj.webUserId + " at " + index);
    await processDelete(userObj.webUserId, index);
  }

  function handleClickDelete(){
     setIsDeleteModal(true)
  }

  function handleClick() {
      console.log("user:")
      console.dir(userObj)
      setExpandedUser(userObj)
  }

  const [isDeleteModal, setIsDeleteModal] = useState(false)

  function handleClose(){
      setIsDeleteModal(false)
  }

  return (
      <Box onClick={handleClick} className="userBox" display="flex" alignItems="center" justifyContent="space-between" p={2}>
        
        <ConfirmDeleteModal open={isDeleteModal} handleClose={handleClose} handleDelete={handleDelete} name={userObj.firstName + " " + userObj.lastName}/>

        <Box display="flex" alignItems="center">
          <Avatar src={userObj.image} alt={`${userObj.firstName} ${userObj.lastName}'s avatar`} />
          <Box ml={2}>
            <Typography variant="h6">{userObj.firstName} {userObj.lastName}</Typography>
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

export default UserBox;
