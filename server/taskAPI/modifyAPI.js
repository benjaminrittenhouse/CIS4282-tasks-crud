const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

const DbMods = require("../model/task/DbMods");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
  
// Insert
router.get("/insertTask", (req, res) => {
  var errors = false;
  // establish task object to take in URL query results
// http://localhost:5001/api/insertTask?taskID=&taskName=asdfasdf&taskDesc=asdfasdf&taskPoints=5&targetDate=2021-05-05&completionDate=2021-05-05&assignedWebUserID=4
  var task = {
    "taskID": req.query.taskID,
    "taskName": req.query.taskName,
    "taskDesc": req.query.taskDesc,
    "taskPoints": req.query.taskPoints,
    "targetDate": req.query.targetDate,
    "completionDate": req.query.completionDate,
    "assignedWebUserID": req.query.assignedWebUserID
  }

  // establish error object to note any formatting errors from values inserted
  var errorObj = {
    "isError": "true",
    "taskID": "",
    "taskName": "",
    "taskDesc": "",
    "taskPoints": "",
    "targetDate": "",
    "completionDate": "",
    "assignedWebUserID": ""
  }

  // validate insert
  var tempObj = DbMods.validateTask(task);

  // check if object returned was a web user object or an error object, update accordingly
  if(tempObj.isError){
      errorObj = tempObj;
      errors = true;
  } else {
      // web user gets formatted, ready to insert into the database
      task = DbMods.insertTask(tempObj);
  }

  if (!errors) {
    console.log("no errors! lets insert task");
    try {     
      const sqlIns = "INSERT INTO tasks (task_name, task_desc, task_points, target_date, completion_date, assigned_web_user_id) VALUES (?,?,?,?,?,?)";
      db.query(sqlIns, [task.taskName, task.taskDesc, task.taskPoints, task.targetDate, task.completionDate, task.assignedWebUserID], (err, req, result) => {
        if (err) {
          // we get database error from sqlMessage and put it into our error object
          console.log("SQL MSG (task): " + err.sqlMessage);
          errorObj.errorMsg = err.sqlMessage;
          res.send(errorObj);
          console.log("There was an error! Task not inserted!")
        } else {
          task.errorMsg = "Task inserted!"
          res.send(task);
          console.log("No errors! Record inserted!");
        }
      });
    } catch (err){
      // res.send("Oh no DB error");
      console.log("ERR DB: " + err);
      errorObj.errorMsg = "Error connecting to database!";
      res.send(errorObj);
    }
  } else {
    errorObj.errorMsg = "Please see field level errors.";
    res.send(errorObj);
    console.log("Errors! Sending error object...");
  }

});

module.exports = router;