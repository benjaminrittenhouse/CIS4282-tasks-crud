function QueryToObj(req){

    const taskObj = {
      "taskID": req.query.taskID ||= "",
      "taskName": req.query.taskName ||= "",
      "taskDesc": req.query.taskDesc ||= "",
      "taskPoints": req.query.taskPoints ||= "",
      "targetDate": req.query.targetDate ||= "",
      "completionDate": req.query.completionDate ||= "",
      "assignedWebUserID": req.query.assignedWebUserID ||= "",
      "catIcon": req.query.catIcon ||= "",
      "catID": req.query.catID ||= "",
    }

  return taskObj
}

module.exports = QueryToObj;