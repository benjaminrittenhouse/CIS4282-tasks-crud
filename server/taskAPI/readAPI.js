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
      const sqlGet = "SELECT task_id, task_name, task_desc, task_points, target_date, completion_date, assigned_web_user_id, first_name, last_name, cat_icon, cat_id, cat_name FROM db.tasks, db.web_user, db.categories"
      + " WHERE tasks.assigned_web_user_id = web_user.web_user_id AND tasks.assigned_category = categories.cat_id";
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

module.exports = router;