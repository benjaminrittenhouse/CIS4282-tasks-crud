const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

const DbMods = require("../model/task/DbMods");
const QueryToObj = require("../model/task/QueryToObj");
const ErrorObj = require("../model/task/ErrorObj");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
  
// Insert
router.get("/insertTask", (req, res) => {
  var errors = false;
  // establish task object to take in URL query results
  var task = QueryToObj(req)

  // establish error object to note any formatting errors from values inserted
  var errorObj = ErrorObj()

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
      const sqlIns = "INSERT INTO tasks (task_name, task_desc, task_points, target_date, completion_date, assigned_web_user_id, assigned_category) VALUES (?,?,?,?,?,?,?)";
      db.query(sqlIns, [task.taskName, task.taskDesc, task.taskPoints, task.targetDate, task.completionDate, task.assignedWebUserID, task.catID], (err, req, result) => {
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

// Update
router.get("/updateTask", (req, res) => {
  // http://localhost:5001/api/updateTask?taskName=newNameHere&taskDesc=newDesHere&taskPoints=555&targetDate=2021-05-05&completionDate=2021-05-05&assignedWebUserID=4&taskID=2
  var errors = false;
  
  console.log("REQ: ");
  console.dir(req.query);

  var task = QueryToObj(req);


  // establish error object to note any formatting errors from values inserted
  var errorObj = ErrorObj()

  // validate insert
  var tempObj = DbMods.validateTask(task);

  // check if object returned was a web user object or an error object, update accordingly
  if(tempObj.isError){
      errorObj = tempObj;
      errors = true;
  } else {
      tempObj = DbMods.insertTask(tempObj);
      task = tempObj;
  }

  if (!errors) {
    console.log("no errors! lets update task");
    try {     
      const sqlIns = "UPDATE tasks SET task_name=?, task_desc=?, task_points=?, target_date=?, completion_date=?, assigned_web_user_id=?, assigned_category=?" 
      + " WHERE task_id=?";
      const obj = [task.taskName, task.taskDesc, task.taskPoints, task.targetDate, task.completionDate, task.assignedWebUserID,  task.catID, task.taskID];
      console.log("CAT ID IN MODIFY: ")
      console.dir(task)
      db.query(sqlIns, obj, (err, req, result) => {
        if (err) {
          // we get database error from sqlMessage and put it into our error object
          console.log("SQL MSG: " + err.sqlMessage);
          errorObj.errorMsg = err.sqlMessage;
          res.send(errorObj);
          console.log("There was an error! Record not updated!")
        } else {
          task.errorMsg = "Record updated!"
          //var temp = DbMods.formatWebUser(webUser);
          res.send(task);
          console.log("No errors! Record updated!");
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

//Delete
router.get("/deleteTask/:id", (req, res) => {
  const sqlDelete = `DELETE FROM tasks WHERE task_id=${req.params.id};`;
  db.query(sqlDelete, (err, result) => {
    if (err) throw err;
    console.log(result);
    if(result.affectedRows>0){
      res.send({
        resp: `Task ${req.params.id} Deleted...`,
        errorMsg: ""
      });
    }else{
      res.send({
        resp: ``,
        errorMsg: `Task with ID of ${req.params.id} does not exist in the database`
      });
    }
  })
})

module.exports = router;