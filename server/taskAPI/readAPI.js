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

module.exports = router;