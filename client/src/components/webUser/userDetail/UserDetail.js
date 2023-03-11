import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./userDetail.css"

const UserDetail = ({ userData }) => {
  const fullName = userData.firstName + " " + userData.lastName;

  const [isData, setIsData] = useState(false);


  useEffect(() => {
    if (userData.firstName !== undefined) {
      setIsData(true);
    }
  }, [userData]);

  return (
    (isData ? (
      <Card className="userDetail">
        <div className="imgAndName">
          <CardMedia
            className="userDetail__media"
            component="img"
            height="140"
            image={userData.image}
            alt={fullName}
          />
          <Typography className="name" variant="h3" component="div" fontWeight="bold">
            {fullName}
          </Typography>
        </div>
        <CardContent className="userDetail__content">
          <Typography variant="subtitle1" component="div">
            {userData.userEmail}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>ID: </span>{userData.webUserId}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Password: </span>{userData.userPassword}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Birthday: </span>{userData.birthday}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Membership Fee: </span> {userData.membershipFee}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Room Number: </span> {userData.roomNumber}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Role: </span> {userData.roleType}
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Card>
        <CardContent>
          <Typography>
            No user selected.
          </Typography>
        </CardContent>
      </Card>
    ))

  );
};

export default UserDetail;
