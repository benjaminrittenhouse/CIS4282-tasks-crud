import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import UserBox from "./UserBox"
import "../userList/UserList.css"

const UserList = ({ users, setExpandedUser, setIsEditing, processDelete, setViewing}) => {

  function handleClick() {
    console.log("yo from userLIst")
  }

  return (
    <List className="userList">
      {users.map((user, index) => (
          <UserBox 
          index={index} setViewing={setViewing} processDelete={processDelete} userData={user} setExpandedUser={setExpandedUser} setIsEditing={setIsEditing} />
      ))}
    </List>
  );
};

export default UserList;
