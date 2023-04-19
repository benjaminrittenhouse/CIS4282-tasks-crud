import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DbToObj from "../DbToObj"

import RoleTypes from './RoleTypes';
import "./edit.css"

function Edit({ props, setIsEditing }) {

    function handleClose() {
        setIsEditing(false);
    }

    const location = useLocation();
    // state message variable to keep track of which was sent most recently... either error object or webUser object
    const [updateMessage, setUpdateMessage] = useState("");


    const [userData, setUserData] = useState({});

    // error object
    const [errorObj, setErrorObj] = useState({})

    // used to set error object back to nothing
    const emptyData = {}

    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };


    // set user data once
    useEffect(() => {
        setUserData(props);
    }, []);



    async function updateUser() {
        try {

            const objToStr = new URLSearchParams(userData).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/updateUser?${objToStr}`;
            console.log("STR: " + str);

            const res = await fetch(str);
            const data = await res.json();

            // check if data is an eror objec
            if (data.isError) {
                setErrorObj(data);
                console.log("setting error data...");
            } else {
                console.log("setting user data...");
                // clear the previous messages from errors when we successfully insert
                setErrorObj(emptyData);
                //setUserData(data);
            }

            setUpdateMessage(data.errorMsg);

        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }

    return (
        <div class="editArea webUser edit">
            <button type="button" className="xButton" onClick={handleClose}>X</button>
            <h2 className="heading">Editing {userData.firstName + " " + userData.lastName}</h2>
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
                <input placeholder="" value={userData.image} onChange=
                    {e => setUserData(setProp(userData, "image", e.target.value))}
                />
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
                    value={props.userRoleId}
                    getUserRoleId={(u) => setUserData(setProp(userData, "userRoleId", u))}
                />
                <span class="error">{errorObj.userRoleId}</span>
            </div>

            <br />
            <div className="buttons">
                <button type="button" className="saveButton" onClick={updateUser}>Save</button>
                <button type="button" className="cancelButton" onClick={handleClose}>Cancel</button>
                <span class="recLevelMsg">{updateMessage}</span>
            </div>

        </div>


    )
}

export default Edit;