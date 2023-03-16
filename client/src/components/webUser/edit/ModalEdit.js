import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DbToObj from "../DbToObj"

import RoleTypes from '../RoleTypes';
import "./modalEdit.css"

function ModalEdit({ props, setIsEditing }) {

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

            // auto reload so user does not have to manual refresh (this is kind of ductape)
            // when user clicks save, the entire page refreshes and update modal closes
            // window.location.reload();
        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }

    return (
        <div className="modalEdit">
            <button type="button" className="xButton" onClick={handleClose}>X</button>
            <h2>Editing {userData.firstName + " " + userData.lastName}</h2>
            <table className="insertArea">
                <tbody>
                    <tr>
                        <td className="textTd">Email</td>
                        <td className="inputTd">
                            <input value={userData.userEmail} onChange=
                                {e => setUserData({ ...userData, userEmail: e.target.value })}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userEmail}
                        </td>
                    </tr>

                    <tr>
                        <td className="textTd">First Name</td>
                        <td  className="inputTd">
                            <input value={userData.firstName} onChange=
                                {e => setUserData({ ...userData, firstName: e.target.value })}
                            />
                        </td>
                        <td className="error">
                            {errorObj.firstName}
                        </td>
                    </tr>

                    <tr>
                        <td className="textTd">Last Name</td>
                        <td  className="inputTd">
                            <input value={userData.lastName} onChange=
                                {e => setUserData({ ...userData, lastName: e.target.value })}
                            />
                        </td>
                        <td className="error">
                            {errorObj.lastName}
                        </td>
                    </tr>


                    <tr>
                        <td className="textTd">Password</td>
                        <td  className="inputTd">
                            <input type="password" value={userData.userPassword} onChange=
                                {e => setUserData({ ...userData, userPassword: e.target.value })}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userPassword}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Re-enter Password</td>
                        <td className="inputTd">
                            <input type="password" value={userData.userPassword2} onChange=
                                {e => setUserData(setProp(userData, "userPassword2", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userPassword2}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Image</td>
                        <td className="inputTd">
                            <input value={userData.image} onChange=
                                {e => setUserData(setProp(userData, "image", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.image}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Birthday</td>
                        <td className="inputTd">
                            <input value={userData.birthday} onChange=
                                {e => setUserData(setProp(userData, "birthday", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.birthday}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Membership Fee</td>
                        <td className="inputTd">
                            <input value={userData.membershipFee} onChange=
                                {e => setUserData(setProp(userData, "membershipFee", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.membershipFee}
                        </td>
                    </tr>

                    <tr>
                        <td className="textTd">Room #</td>
                        <td className="inputTd">
                            <input value={userData.roomNumber} onChange=
                                {e => setUserData(setProp(userData, "roomNumber", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.roomNumber}
                        </td>
                    </tr>

                    <tr>
                        <td className="textTd">Role</td>
                        <td className="inputTd">
                            <RoleTypes
                                value={props.userRoleId}
                                className="roleTypes"
                                getUserRoleId={(u) => setUserData(setProp(userData, "userRoleId", u))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userRoleId}
                        </td>
                    </tr>

                    <tr>
                        <td className="error" colSpan="2">
                            <br />
                            {/* TO DO : re-render this so we see record inserted, when we first get an error, and then insert again*/}

                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="buttons">
                <button type="button" className="saveButton" onClick={updateUser}>Save</button>
                <button type="button" className="cancelButton" onClick={handleClose}>Cancel</button>
            </div>

            <div>
                {updateMessage}
            </div>

        </div>
    )
}

export default ModalEdit;