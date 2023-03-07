import React from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DbToObj from '../DbToObj';
import './UserBox.css';


function UserBox({ userData }) {




  const userObj = DbToObj(userData);

  return (
    <Box className="box-style" display="flex" alignItems="center" justifyContent="space-between" p={2}>
      <Box display="flex" alignItems="center">
        <Avatar src={userObj.image} alt={`${userObj.firstName} ${userObj.lastName}'s avatar`} />
        <Box ml={2}>
          <Typography variant="h6">{userObj.firstName} {userObj.lastName}</Typography>
        </Box>
      </Box>
      <Box ml="auto">
        <IconButton aria-label="edit" onClick={handleUpdate}>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete">
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserBox;
