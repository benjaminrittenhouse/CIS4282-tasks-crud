import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./userDetail.css"

const UserDetail = ({ userData }) => {
  const fullName = userData.firstName + " " + userData.lastName;
  const birthday = "Birthday: " + userData.birthday;

  console.log("user data");
  console.dir(userData)

  return (
    <Card className="userDetail">
      <CardMedia
        className="userDetail__media"
        component="img"
        height="140"
        image={userData.image}
        alt={fullName}
      />
      <CardContent className="userDetail__content">
        <Typography variant="h5" component="div" fontWeight="bold">
          {fullName}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {userData.userEmail}
        </Typography>
        <Typography variant="subtitle1" component="div">
          {birthday}
        </Typography>
        <Typography variant="subtitle1" component="div">
          Membership Fee: ${userData.membershipFee}
        </Typography>
        <Typography variant="subtitle1" component="div">
          Room Number: {userData.roomNumber}
        </Typography>
        <Typography variant="subtitle1" component="div">
          Role: {userData.roleType}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
