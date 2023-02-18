const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

const DbMods = require("../model/webUser/DbMods");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// list all tasks
router.get("/listAllTasks", (req, res) => {
    try {
      const sqlGet = "SELECT task_id, task_name, task_desc, task_points, target_date, completion_date, assigned_web_user_id, user_email FROM db.tasks, db.web_user "
      + "WHERE tasks.assigned_web_user_id = web_user.web_user_id";
      db.query(sqlGet, (req, result) => {
          res.send(result);
      });
    } catch (error) {
        console.log("ERROR DISPLAYING: " + error);
    }
  }); 


  // Get user from search API (IN TESTING)
// http://localhost:5001/api/queryUsers?firstName=B

router.get("/queryUsers", (req, res) => {
  var firstName = req.query.firstName;
  console.log("FIRST NAME: " + req.query.firstName)
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

module.exports = router;