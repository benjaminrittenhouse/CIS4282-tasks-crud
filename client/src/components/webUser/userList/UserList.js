import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import UserBox from "./UserBox"
import "../userList/UserList.css"

const UserList = ({ users, setExpandedUser }) => {

  return (
    <List className="userList">
      {users.map((user, index) => (
            <UserBox userData={user}  key={index} setExpandedUser={setExpandedUser} />
      ))}
    </List>
  );
};

export default UserList;
