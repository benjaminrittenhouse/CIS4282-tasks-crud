import React, { useState } from 'react';
import RoleTypes from './RoleTypes'
import axios from 'axios';
import "../../../style/editArea.css"


function Insert(props) {

    const [insertMessage, setInsertMessage] = useState("");
    const [userData, setUserData] = useState({});
    const [errorObj, setErrorObj] = useState({})


    // used to set error object back to nothing
    const emptyData = {}

    // set prop helper method
    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };

    const [roleList, setRoleList] = useState([]);

    const [sqlMessage, setSqlMessage] = useState("");

    // file submission 
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        axios.post('http://localhost:5001/uploads', formData);
        console.log("uploaded file ")
    };

    //an asynchronous function that will either return the API data or an error
    async function insertUser() {
        try {

            const objToStr = new URLSearchParams(userData).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/insertUser?${objToStr}`;

            // console log the API fetch call
            console.log("STR w/ OBJ: " + str);

            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            console.log("Data returned from API call: " + JSON.stringify(data));

            // check if data is an eror objec
            if (data.isError) {
                setErrorObj(data);
                console.log("setting error data...");
            } else {
                console.log("setting user data...");
                // clear the previous messages from errors when we successfully insert
                setErrorObj(emptyData);
                // setUserData(data);
                handleUpload();
            }

            setInsertMessage(data.errorMsg);

        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }



    return (
        <div class="editArea">
            <h2 className="heading">Add a New User</h2>
            <div class="row">
                <span class="prompt">Email:</span>
                <input placeholder="example@mail.com" value={userData.userEmail} onChange=
                    {e => setUserData({ ...userData, userEmail: e.target.value })}
                />
                <span class="error">{errorObj.userEmail}</span>
            </div>
            <div class="row">
                <span class="prompt">First Name:</span>
                <input placeholder="Johnny" value={userData.firstName} onChange=
                    {e => setUserData({ ...userData, firstName: e.target.value })}
                />
                <span class="error">{errorObj.firstName}</span>
            </div>
            <div class="row">
                <span class="prompt">Last Name:</span>
                <input placeholder="Appleseed" value={userData.lastName} onChange=
                    {e => setUserData({ ...userData, lastName: e.target.value })}
                />
                <span class="error">{errorObj.lastName}</span>
            </div>
            <div class="row">
                <span class="prompt">Password:</span>
                <input type="password" value={userData.userPassword} onChange=
                    {e => setUserData({ ...userData, userPassword: e.target.value })}
                />
                <span class="error">{errorObj.userPassword}</span>
            </div>
            <div class="row">
                <span class="prompt">Confirm Password:</span>
                <input type="password" value={userData.userPassword2} onChange=
                    {e => setUserData(setProp(userData, "userPassword2", e.target.value))}
                />
                <span class="error">{errorObj.userPassword2}</span>
            </div>
            <div class="row">
                <span class="prompt">Image:</span>
                <input type="file" onChange={handleFileSelect} />
                <span class="error">{errorObj.image}</span>
            </div>
            <div class="row">
                <span class="prompt">Birthday:</span>
                <input placeholder="mm/dd/yyyy" value={userData.birthday} onChange=
                    {e => setUserData(setProp(userData, "birthday", e.target.value))}
                />
                <span class="error">{errorObj.birthday}</span>
            </div>
            <div class="row">
                <span class="prompt">Membership Fee:</span>
                <input placeholder="$100.00" value={userData.membershipFee} onChange=
                    {e => setUserData(setProp(userData, "membershipFee", e.target.value))}
                />
                <span class="error">{errorObj.membershipFee}</span>
            </div>
            <div class="row">
                <span class="prompt">Room #:</span>
                <input placeholder="111" value={userData.roomNumber} onChange=
                    {e => setUserData(setProp(userData, "roomNumber", e.target.value))}
                />
                <span class="error">{errorObj.roomNumber}</span>
            </div>
            <div class="row">
                <span class="prompt">Role:</span>
                <RoleTypes
                    value={userData.userRoleId}
                    getUserRoleId={(u) => setUserData(setProp(userData, "userRoleId", u))}
                />
                <span class="error">{errorObj.userRoleId}</span>
            </div>
            <br />
            <div class="buttonsAndMessage">
            <button type="button" onClick={insertUser}>Save</button>
            <span class="recLevelMsg">{insertMessage}</span>
            </div>
    
        </div>
    )
}

export default Insert;