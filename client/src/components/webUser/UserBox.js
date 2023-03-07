import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import DbToObj from './DbToObj';

function UserBox({ userData }){
  console.log("USERBOX:")
  console.dir({userData})

  const userObj = DbToObj(userData);

  return (
    <Box display="flex" alignItems="center" p={2}>
      <Avatar src={userObj.image} alt={`${userObj.firstName + " " + userObj.lastName}'s avatar`} />
      <Box ml={2}>
        <Typography variant="h6">{userObj.firstName + " " + userObj.lastName}</Typography>
      </Box>
    </Box>
  );
};

export default UserBox;