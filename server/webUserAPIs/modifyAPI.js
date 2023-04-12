const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");
const QueryToObj = require("../model/webUser/QueryToObj")
const ErrorObj = require("../model/webUser/ErrorObj")

const DbMods = require("../model/webUser/DbMods");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
  
// Insert
router.get("/insertUser", (req, res) => {
  var errors = false;
  // establish webUser object to take in URL query results
  // http://localhost:5000/api/insertUser?webUserId=&userEmail=asdf&userPassword=asdf&userPassword2=asdf&image=asdf&birthday=2020-05-05&membershipFee=100&userRoleId=asdf&errorMsg=
  var webUser = QueryToObj(req)

  // establish error object to note any formatting errors from values inserted
  var errorObj = ErrorObj();

  // validate insert
  var tempObj = DbMods.validateWebUser(webUser);

  // check if object returned was a web user object or an error object, update accordingly
  if(tempObj.isError){
      errorObj = tempObj;
      errors = true;
  } else {
      // web user gets formatted, ready to insert into the database
      webUser = DbMods.insertWebUser(tempObj);
  }

  if (!errors) {
    console.log("no errors! lets insert");
    try {     
      const sqlIns = "INSERT INTO web_user (user_email, first_name, last_name, user_password, image, membership_fee, birthday, room_number, user_role_id) VALUES (?,?,?,?,?,?,?,?,?)";
      db.query(sqlIns, [webUser.userEmail, webUser.firstName, webUser.lastName, webUser.userPassword, webUser.image, webUser.membershipFee, webUser.birthday, webUser.roomNumber, webUser.userRoleId], (err, req, result) => {
        if (err) {
          // we get database error from sqlMessage and put it into our error object
          errorObj.errorMsg = "Please make a valid role selection.";
          res.send(errorObj);
          console.log("There was an error! Record not inserted: " + err.sqlMessage);
        } else {
          webUser.errorMsg = "Record inserted!"
          res.send(webUser);
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
    console.dir(errorObj)
  }

});

// Update
router.get("/updateUser", (req, res) => {
  var errors = false;
  // iterate
  // write to server file and save
  // in database, path or url or pointer to file in some folder under /server
  var webUser = QueryToObj(req)

  var errorObj = ErrorObj();

  // validate insert
  var tempObj = DbMods.validateWebUser(webUser);

  // check if object returned was a web user object or an error object, update accordingly
  if(tempObj.isError){
      errorObj = tempObj;
      errors = true;
  } else {
      tempObj = DbMods.insertWebUser(tempObj);
      webUser = tempObj;
  }

  if (!errors) {
    console.log("no errors! lets update");
    try {     
      const sqlIns = "UPDATE web_user SET user_email=?, first_name=?, last_name=?, user_password=?, image=?, membership_fee=?, birthday=?, room_number=?, user_role_id=?" 
      + " WHERE web_user_id=?";
      const obj = [webUser.userEmail, webUser.firstName, webUser.lastName, webUser.userPassword, webUser.image, webUser.membershipFee, webUser.birthday, webUser.roomNumber, webUser.userRoleId, webUser.webUserId];
      db.query(sqlIns, obj, (err, req, result) => {
        if (err) {
          // we get database error from sqlMessage and put it into our error object
          console.log("SQL MSG: " + err.sqlMessage);
          errorObj.errorMsg = "Please make a valid role selection.";
          res.send(errorObj);
          console.log("There was an error! Record not updated!")
        } else {
          webUser.errorMsg = "Record updated!"
          //var temp = DbMods.formatWebUser(webUser);
          res.send(webUser);
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
router.get("/deleteUser/:id", (req, res) => {
  const sqlDelete = `DELETE FROM web_user WHERE web_user_id=${req.params.id};`;
  db.query(sqlDelete, (err, result) => {
    if (err) throw err;
    console.log(result);
    if(result.affectedRows>0){
      res.send({
        resp: `User ${req.params.id} Deleted...`,
        errorMsg: ""
      });
    }else{
      res.send({
        resp: ``,
        errorMsg: `User with ID of ${req.params.id} does not exist in the database`
      });
    }
  })
})

module.exports = router;