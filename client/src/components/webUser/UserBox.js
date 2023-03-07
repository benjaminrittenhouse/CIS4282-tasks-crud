import React from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DbToObj from './DbToObj';

function UserBox({ userData }) {
  const userObj = DbToObj(userData);

  return (
    <Box display="flex" alignItems="center" p={2}>
      <Avatar src={userObj.image} alt={`${userObj.firstName} ${userObj.lastName}'s avatar`} />
      <Box ml={2}>
        <Typography variant="h6">{userObj.firstName} {userObj.lastName}</Typography>
      </Box>
      <Box ml="auto">
        <IconButton aria-label="edit">
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
