import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Snackbar } from '@mui/material';
import "./taskDetail.css"
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';



// Code to create a custom tooltip for hovering over task image (React MUI)
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#3ea0f0',
    color: 'white',
    maxWidth: 350,
    fontSize: '1rem',
    border: '1px solid #dadde9',
    marginLeft: '1rem'
  },
}));


const TaskDetail = ({ taskData, setViewing, viewing }) => {

  // snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });

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
        <HtmlTooltip title={taskData.catName} placement="left-start">
          <CardMedia
            className="taskDetail__media"
            component="img"
            height="140"
            image={taskData.catIcon}
            alt={taskData.taskName}
          />

          </HtmlTooltip>

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
