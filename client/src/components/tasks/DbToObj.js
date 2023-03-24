function DbToObj(task){
    const taskObj = {
        "taskID": task.task_id,
        "taskName": task.task_name,
        "taskDesc": task.task_desc,
        "taskPoints": task.task_points,
        "targetDate": task.target_date,
        "completionDate": task.completion_date,
        "assignedWebUserID": task.assigned_web_user_id,
        "assignedWebUser": task.first_name + " " + task.last_name,
        "catID": task.cat_id,
        "catIcon": task.cat_icon,
    }

  return taskObj
}

export default DbToObj;