const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// list all tasks
router.get("/listAllCategories", (req, res) => {
    try {
      const sqlGet = "SELECT cat_id, cat_name, cat_icon, cat_desc FROM categories";
      db.query(sqlGet, (req, result) => {
        var cats = [];
        for(var ele of result){
            cats.push(ele);
        }

        res.send(cats);
      });
    } catch (error) {
        console.log("ERROR DISPLAYING: " + error);
    }
  }); 

  module.exports = router;