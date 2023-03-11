import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography
} from '@mui/material';

import DbToObj from "../DbToObj"

import RoleTypes from '../RoleTypes';

function Edit({ props, setModalVisibility }) {

    // COOL: way to change state from a child component!!
    function handleVisibility() {
        setModalVisibility("updateHide");
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
            <Dialog open={true} onClose={handleVisibility}>
                <DialogTitle>Update</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Email"
                        value={userData.userEmail}
                        onChange={e => setUserData({ ...userData, userEmail: e.target.value })}
                        fullWidth
                        error={errorObj.userEmail ? true : false}
                        helperText={errorObj.userEmail}
                    />
                    <TextField
                        label="First Name"
                        value={userData.firstName}
                        onChange={e => setUserData({ ...userData, firstName: e.target.value })}
                        fullWidth
                        error={errorObj.firstName ? true : false}
                        helperText={errorObj.firstName}
                    />
                    <TextField
                        label="Last Name"
                        value={userData.lastName}
                        onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                        fullWidth
                        error={errorObj.lastName ? true : false}
                        helperText={errorObj.lastName}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={userData.userPassword}
                        onChange={e => setUserData({ ...userData, userPassword: e.target.value })}
                        fullWidth
                        error={errorObj.userPassword ? true : false}
                        helperText={errorObj.userPassword}
                    />
                    <TextField
                        label="Re-enter Password"
                        type="password"
                        value={userData.userPassword2}
                        onChange={e => setUserData(setProp(userData, "userPassword2", e.target.value))}
                        fullWidth
                        error={errorObj.userPassword2 ? true : false}
                        helperText={errorObj.userPassword2}
                    />
                    <TextField
                        label="Image"
                        value={userData.image}
                        onChange={e => setUserData(setProp(userData, "image", e.target.value))}
                        fullWidth
                        error={errorObj.image ? true : false}
                        helperText={errorObj.image}
                    />
                    <TextField
                        label="Birthday"
                        value={userData.birthday}
                        onChange={e => setUserData(setProp(userData, "birthday", e.target.value))}
                        fullWidth
                        error={errorObj.birthday ? true : false}
                        helperText={errorObj.birthday}
                    />
                    <TextField
                        label="Membership Fee"
                        value={userData.membershipFee}
                        onChange={e => setUserData(setProp(userData, "membershipFee", e.target.value))}
                        fullWidth
                        error={errorObj.membershipFee ? true : false}
                        helperText={errorObj.membershipFee}
                    />
                    <TextField
                        label="Room #"
                        value={userData.roomNumber}
                        onChange={e => setUserData(setProp(userData, "roomNumber", e.target.value))}
                        fullWidth
                        error={errorObj.roomNumber ? true : false}
                        helperText={errorObj.roomNumber}
                    />
                    </DialogContent>
            </Dialog>
    
    
    )
}

export default Edit;