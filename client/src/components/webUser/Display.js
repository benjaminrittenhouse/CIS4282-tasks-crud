import React, { useState, useEffect } from "react";
import User from "./User.js";
import DeleteModal from "./DeleteModal.js";

import "../../style/user/collapsed-user.css";
import "../../style/user/expanded-user.css";
import "../../style/navbar.css";
import "../../style/style.css"
import "../../style/user/user-table.css"
import "../../style/update.css"
import "../../style/modalWindow.css"



function Display(props) {

  //used to store the JS Object that comes from the API call
  const [userList, setUserList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [clickedUser, setClickedUser] = useState({});
  const [okClicked, setOkClicked] = useState(false);
  const [clickIndex, setClickIndex] = useState();

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
    <div className="view">
      <h2 className="heading">Web User Display and Delete</h2>
      <div className="main">
        

        <div className="userTable">
          <div className="tableBody">
            {userList.length > 0 ? (
              userList.map((ele, index) => (
                <div key={index} className="userBlock" onClick={()=>setExpandedUser(ele)}>
                  <User props={ele} shouldShow={false} />
                </div>
              ))
            ) : (
              <div>
                <p>No Users Found</p>
              </div>
            )}
          </div>
        </div>

        <div className="expandedView">
            <User props={expandedUser} expandedUser={expandedUser} shouldShow={true} />
        </div>
      </div>

    </div>
  );
} // end of Display() function

export default Display;
