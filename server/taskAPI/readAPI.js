const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

const DbMods = require("../model/task/DbMods");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// list all tasks
router.get("/listAllTasks", (req, res) => {
    try {
      const sqlGet = "SELECT task_id, task_name, task_desc, task_points, target_date, completion_date, assigned_web_user_id, first_name, last_name FROM db.tasks, db.web_user "
      + "WHERE tasks.assigned_web_user_id = web_user.web_user_id";
      db.query(sqlGet, (req, result) => {
        var tasks = [];
        for(var ele of result){
            tasks.push(DbMods.formatTask(ele));
        }

        res.send(tasks);
      });
    } catch (error) {
        console.log("ERROR DISPLAYING: " + error);
    }
  }); 


  // Get user from search API (IN TESTING)
// http://localhost:5001/api/queryUsers?firstName=B

router.get("/queryUsers", (req, res) => {
  var firstName = req.query.firstName;
  // console.log("FIRST NAME: " + req.query.firstName)
  try {
    const sqlGet = `SELECT web_user_id, first_name, last_name FROM web_user WHERE first_name LIKE \'${firstName}%\' ORDER BY first_name ASC LIMIT 10`;
    db.query(sqlGet,[req.query.firstName, req.query.lastName], (err, req2, result) => {
      if (err) {
        console.log("SQL MSG: " + err.sqlMessage);
        res.send("No results found with this search.");
        console.log("There was an error! Record not inserted!")
      } else {
        res.send(req2);
        console.log("Users found in this query!");
      }
    });
      console.log("ERROR DISPLAYING: " + error);
  } catch (err){

  }

}); 

router.get("/queryGreaterUsers", (req, res) => {
  var firstName = req.query.firstName;
  var threshold = req.query.threshold
  // console.log("FIRST NAME: " + req.query.firstName)
  try {
    const sqlGet = `SELECT web_user_id, first_name, last_name FROM web_user WHERE first_name LIKE \'${firstName}%\'`
    + ` AND first_name > \'${threshold}\' ORDER BY first_name ASC LIMIT 10`;
    db.query(sqlGet,[req.query.firstName, req.query.lastName], (err, req2, result) => {
      if (err) {
        console.log("SQL MSG: " + err.sqlMessage);
        res.send("No results found with this search.");
        console.log("There was an error! Record not inserted!")
      } else {
        res.send(req2);
        console.log("Users found in this query!");
      }
    });
      console.log("ERROR DISPLAYING: " + error);
  } catch (err){

  }

});

/*router.get("/getNumberUsers", (req, res) => {
  var firstName = req.query.firstName;
  // console.log("FIRST NAME: " + req.query.firstName)
  try {
    const sqlGet = `SELECT COUNT(*) as count FROM web_user WHERE first_name LIKE '${firstName}%' ORDER BY first_name ASC`;
    db.query(sqlGet,[req.query.firstName, req.query.lastName], (err, req2, result) => {
      if (err) {
        console.log("SQL MSG: " + err.sqlMessage);
        res.send("No results found with this search.");
        console.log("There was an error! Record not inserted!")
      } else {
        res.send(req2);
        console.log("Users found in this query!");
      }
    });
      console.log("ERROR DISPLAYING: " + error);
  } catch (err){

  }

}); */

module.exports = router;