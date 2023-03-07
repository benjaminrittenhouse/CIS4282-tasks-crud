import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "../userList/UserList.css"

const UserDetail = ({ userData }) => {
    console.log("USER DATA DETAIL")
    console.dir(userData)
 return (
   <Card className="userDetail">
     <CardContent>
       <Typography variant="h5" component="div">
         {userData.firstName + userData.lastName}
       </Typography>
       <Typography variant="subtitle1" component="div">
         {userData.email}
       </Typography>
       <Typography variant="subtitle1" component="div">
         {userData.birthday}
       </Typography>
     </CardContent>
     <CardMedia
       component="img"
       height="140"
       image={userData.image}
       alt="user avatar"
     />
   </Card>
 );
};

export default UserDetail;
