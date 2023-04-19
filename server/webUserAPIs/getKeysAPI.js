const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

const DbMods = require("../model/webUser/DbMods");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.get("/queryUsers", (req, res) => {
    var searchName = req.query.searchName;
    var threshold = req.query.threshold
  
    try {
      /*const sqlGet = `SELECT web_user_id, first_name, last_name FROM web_user WHERE last_name LIKE \'${searchName}%\'`
      + ` AND last_name > \'${threshold}\' ORDER BY last_name ASC LIMIT 10`;*/
  
      //CONCAT_WS(', ', last_name, first_name) AS fullname ? not working
      const sqlGet2 = `SELECT web_user_id, first_name, last_name FROM web_user
      WHERE CONCAT_WS(', ', last_name, first_name) LIKE '${searchName}%' AND CONCAT_WS(', ', last_name, first_name) > '${threshold}' ORDER BY last_name ASC LIMIT 10;`
  
      console.log("sql 2: " + sqlGet2);
      db.query(sqlGet2,[req.query.firstName, req.query.lastName], (err, req2, result) => {
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
  
  router.get("/getNumberUsers", (req, res) => {
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
  
  });

  module.exports = router;