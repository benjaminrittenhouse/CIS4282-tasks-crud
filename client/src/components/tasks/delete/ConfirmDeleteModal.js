import React, { useState } from "react";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  makeStyles,
} from "@mui/material";

import "./confirmDeleteModal.css"

function ConfirmDeleteModal({ open, handleClose, handleDelete, name}) {

  const handleConfirmDelete = () => {
    handleDelete();
    handleClose();
  };

  return (
    <Modal
      className="confirmDeleteModal"
      open={open}
      onClose={handleClose}
    >
      <Fade in={open}>
        <div className="modalBox">
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Are you sure you want to delete {name}?
          </Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Delete</Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmDeleteModal;
