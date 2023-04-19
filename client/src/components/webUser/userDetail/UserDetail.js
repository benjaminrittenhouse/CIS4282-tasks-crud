import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./userDetail.css"

const UserDetail = ({ userData, setViewing, viewing }) => {
  // conditionally check 
  const fullName = userData.firstName + " " + userData.lastName;
  var fullImage = "";
  if (userData.image) {
    if (userData.image.includes(userData.userEmail)) {
      fullImage = `${process.env.REACT_APP_API_URL}/uploads/` + userData.image
    } else {
      fullImage = userData.image
    }
  }

  const [isData, setIsData] = useState(false);

  function handleClose() {
    setViewing(false)
    // console.log("viewing: " + )
  }

  useEffect(() => {
    if (userData.firstName !== undefined) {
      setIsData(true);
    } else {
      setIsData(false)
    }
  }, [userData]);

  return (
    (isData ? (
      <Card className={`userDetail ${viewing}`}>
        <button type="button" className="xButton" onClick={handleClose}>X</button>
        <div className="imgAndName">
          <CardMedia
            className="userDetail__media"
            component="img"
            height="140"
            image={fullImage}
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
