import React, { useState, useEffect } from "react";
import User from "../User.js";
import DeleteModal from "../DeleteModal.js";
import UserDetail from "../userDetail/UserDetail";

import UserBox from "../userList/UserBox"

import "../../../style/navbar.css";
import "../../../style/style.css"
import "../../../style/user/user-table.css"
import "../../../style/update.css"
import "../../../style/modalWindow.css"

import "./displayView.css"
import "./expandedUserView.css"
import "./scrollableContainer.css"

import "../../webUser/userList/UserList.css"
import UserList from "../userList/UserList.js";
import Edit from "../Edit"



function Display(props) {

  //used to store the JS Object that comes from the API call
  const [userList, setUserList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [clickedUser, setClickedUser] = useState({});
  const [okClicked, setOkClicked] = useState(false);
  const [clickIndex, setClickIndex] = useState();

  const [isEditing, setIsEditing] = useState(false);


  const [expandedUser, setExpandedUser] = useState({})

  async function fetchAllUsers() {
    try {

      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/listAllUsers"
      );

      const data = await res.json();

      setUserList(data);
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
      }
    } catch (err) {
      console.log(err);
    }
    setOpenModal(false)
  }

  return (

    <div className="displayView">

      {/* Scrollable User List */}
      <div className="scrollableContainer">
        <div className="userListContainer">
          <UserList users={userList} setExpandedUser={setExpandedUser} setIsEditing={setIsEditing} />
        </div>
      </div>

      {/* Expanded User View */}
      <div className="expandedUserView">
      {isEditing ? <Edit props={expandedUser} /> : <UserDetail userData={expandedUser} />}
      </div>

    </div>

  );
} // end of Display() function

export default Display;
