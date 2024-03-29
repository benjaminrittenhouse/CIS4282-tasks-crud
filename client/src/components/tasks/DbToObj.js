function DbToObj(task){
    const taskObj = {
        "taskID": task.task_id,
        "taskName": task.task_name,
        "taskDesc": task.task_desc,
        "taskPoints": task.task_points,
        "targetDate": task.target_date,
        "completionDate": task.completion_date,
        "assignedWebUserID": task.assigned_web_user_id,
        "assignedWebUser": task.last_name + ", " + task.first_name,
        "catID": task.cat_id,
        "catIcon": task.cat_icon,
        "catName": task.cat_name
    }

  return taskObj
}

export default DbToObj;