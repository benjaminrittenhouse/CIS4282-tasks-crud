import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Snackbar } from '@mui/material';
import "./taskDetail.css"

const TaskDetail = ({ taskData, setViewing, viewing }) => {

  // snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [position, setPosition] = useState({x: 0, y: 0});

  const handleOpenSnackbar = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const [isData, setIsData] = useState(false);

  function handleClose() {
    setViewing(false)
    // console.log("viewing: " + )
  }

  useEffect(() => {
    console.log("task data")
    console.dir(taskData)
    if (taskData.taskName !== undefined) {
      setIsData(true);
    } else {
      setIsData(false)
    }
  }, [taskData]);

  return (
    (isData ? (
      <Card className={`taskDetail ${viewing}`}>
        <button type="button" className="xButton" onClick={handleClose}>X</button>
        <div className="imgAndName">
          <CardMedia
            className="taskDetail__media"
            component="img"
            height="140"
            image={taskData.catIcon}
            alt={taskData.taskName}
            onMouseEnter={handleOpenSnackbar}
            onMouseLeave={handleCloseSnackbar}
          />

            <Snackbar
              open={openSnackbar}
              message={"Category: " + taskData.catName}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                // Update the y position of the Snackbar to be above the mouse cursor
                transformOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                // Set the offset of the Snackbar to the position of the mouse cursor
                // minus half the width of the Snackbar
                // This centers the Snackbar above the mouse cursor
                offset: `0, -${window.innerWidth - position.x - 100}, ${position.y - window.innerHeight + 100}, 0`,
              }}
            />


          <Typography className="name" variant="h3" component="div" fontWeight="bold">
            {taskData.taskName}
          </Typography>
        </div>
        <CardContent className="taskDetail__content">
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Description: </span>{taskData.taskDesc}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Points: </span>{taskData.taskID}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Target Date: </span>{taskData.targetDate}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Completion Date: </span>{taskData.completionDate}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <span style={{ fontWeight: "bold" }}>Assigned: </span> {taskData.assignedWebUser}
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Card>
        <CardContent>
          <Typography>
            No task selected.
          </Typography>
        </CardContent>
      </Card>
    ))

  );
};

export default TaskDetail;
