import React from 'react'

function DeleteModal({ open, task, onOkClicked, onClose }) {
    if(!open) return null

  return (
    <div className='modalWindow'>
        <h5>Are you sure you want to delete {task.task_name}?</h5>

        <button onClick={onOkClicked}>OK</button>
        <button onClick={onClose}>Cancel</button>
    </div>
  )
}

export default DeleteModal