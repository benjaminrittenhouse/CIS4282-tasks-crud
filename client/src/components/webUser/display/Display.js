import React, { useState, useEffect } from "react";
import UserDetail from "../userDetail/UserDetail";

import "./displayView.css"
import "../../webUser/userList/UserList.css"
import UserList from "../userList/UserList.js";
import Edit from "../edit/Edit"
import DbToObj from "../DbToObj";


function Display(props) {

  //used to store the JS Object that comes from the API call
  const [userList, setUserList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [viewing, setViewing] = useState(false);

  const [expandedUser, setExpandedUser] = useState({})

  async function fetchAllUsers() {
    try {

      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/listAllUsers"
      );

      const data = await res.json();

      setUserList(data);
      setExpandedUser(DbToObj(data[0]))
    } catch (err) {

      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);


  const [userID, setUserID] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setUserID(value);
  };

  async function processDelete(userId, index) {

    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/deleteUser/" + userId
      );

      const data = await res.json();
      console.log(data);

      if (data.errorMsg.length > 0) {
        console.log("Could not delete user " + userId + "!");
      } else {
        console.log("index: " + index);

        var newList = userList;
        newList.splice(index, 1);
        setUserList([...newList]);
        setExpandedUser(DbToObj(userList[0]))
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (

    <div className={`displayView ${viewing}`}>

      {/* Scrollable User List */}
      <div className="scrollableContainer">
        <div className="userListContainer">
          <UserList processDelete={processDelete} users={userList} setViewing={setViewing} setExpandedUser={setExpandedUser} setIsEditing={setIsEditing} />
        </div>
      </div>

      {/* Expanded User View */}
      <div className={`expandedUserView ${viewing}`}>
      {isEditing ? <Edit props={expandedUser} setIsEditing={setIsEditing} /> : <UserDetail userData={expandedUser} viewing={viewing} setViewing={setViewing} />}
      </div>

    </div>

  );
} // end of Display() function

export default Display;
