import React, { useState } from 'react';
import RoleTypes from '../RoleTypes'
import axios from 'axios';
import { TextField, Box, Button } from "@mui/material";


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
        <div className="edit">
            <h2 className="heading">Add a New User</h2>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Email"
                    value={userData.userEmail}
                    onChange={e => setUserData({ ...userData, userEmail: e.target.value })}
                    error={errorObj.userEmail}
                    helperText={errorObj.userEmail}
                    size="small"
                    id="outlined-helperText"
                />

                <TextField
                    label="First Name"
                    value={userData.firstName}
                    onChange={e => setUserData({ ...userData, firstName: e.target.value })}
                    error={errorObj.firstName}
                    helperText={errorObj.firstName}
                    size="small"
                    id="outlined-helperText"
                />

                <TextField
                    label="Last Name"
                    value={userData.lastName}
                    onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                    error={errorObj.lastName}
                    helperText={errorObj.lastName}
                    size="small"
                    id="outlined-helperText"
                />

                <TextField
                    label="Password"
                    value={userData.userPassword}
                    onChange={e => setUserData(setProp(userData, "userPassword", e.target.value))}
                    error={errorObj.userPassword}
                    helperText={errorObj.userPassword}
                    size="small"
                    id="outlined-helperText"
                    type="password"
                />

                <TextField
                    label="Re-enter Password"
                    value={userData.userPassword2}
                    onChange={e => setUserData(setProp(userData, "userPassword2", e.target.value))}
                    error={errorObj.userPassword2}
                    helperText={errorObj.userPassword2}
                    size="small"
                    id="outlined-helperText"
                    type="password"
                />

                <TextField
                    label="Image"
                    value={userData.image}
                    onChange={e => setUserData({ ...userData, image: e.target.value })}
                    error={errorObj.image}
                    helperText={errorObj.image}
                    size="small"
                    id="outlined-helperText"
                />

                <TextField
                    label="Birthday"
                    value={userData.birthday}
                    onChange={e => setUserData(setProp(userData, "birthday", e.target.value))}
                    error={errorObj.birthday}
                    helperText={errorObj.birthday}
                    size="small"
                    id="outlined-helperText"
                />

                <TextField
                    label="Membership Fee"
                    value={userData.membershipFee}
                    onChange={e => setUserData(setProp(userData, "membershipFee", e.target.value))}
                    error={errorObj.membershipFee}
                    helperText={errorObj.membershipFee}
                    size="small"
                    id="outlined-helperText"
                />

                <TextField
                    label="Room #"
                    value={userData.roomNumber}
                    onChange={e => setUserData(setProp(userData, "roomNumber", e.target.value))}
                    error={errorObj.roomNumber}
                    helperText={errorObj.roomNumber}
                    size="small"
                    id="outlined-helperText"
                />

                <RoleTypes
                    selectedRole={userData.userRoleId}
                    getUserRoleId={(u) => setUserData(setProp(userData, "userRoleId", u))}
                    passedError={errorObj.userRoleId}
                />

            </Box>

            <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" onClick={insertUser}>Save</Button>
                <div style={{marginTop: '1rem'}}>{insertMessage}</div>
            </Box>

        </div>
    )
}

export default Insert;