import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./taskDetail.css"

const TaskDetail = ({ taskData, setViewing, viewing}) => {

  const [isData, setIsData] = useState(false);
  
  function handleClose(){
    setViewing(false)
    // console.log("viewing: " + )
  }

  useEffect(() => {
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
            image={taskData.image}
            alt={taskData.taskName}
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
