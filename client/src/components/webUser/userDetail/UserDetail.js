import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./userDetail.css"

const UserDetail = ({ userData }) => {

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
