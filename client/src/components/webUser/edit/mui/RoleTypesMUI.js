import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";



//This is the function that is being rendered by ReactDOM
function RoleTypes({ getUserRoleId, selectedRole, passedError}) {

    var [roles, setRoles] = useState([]);

    async function fetchRoleTypes() {
        try {
            const str = `${process.env.REACT_APP_API_URL}/api/getRoleTypes`;

            const res = await fetch(str);

            //res.json parses the JSON response and returns a JS Object insead
            const data = await res.json();

            //set our userList array with our JS Object
            var temp = [];
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i]);
            }

            console.log("ROLES")
            console.dir(temp)
            setRoles(temp);
        } catch (err) {
            //error catching
            console.log(err);
        }
    }

    //useEffect will run upon loading the page, this is where we will call our RoleTypes API
    useEffect(() => {
        fetchRoleTypes();
    }, []);


    const passingProps = (e) => {
        getUserRoleId(e.target.value);
    }

    return (

            <FormControl size="small" style={{width: "13.2rem"}} error={passedError}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // selected is determined here (if editing, one is already selected, for example)
                    value={selectedRole}
                    label="Role"
                    sx={{
                        borderColor: passedError ? 'red' : '',
                      }}
                >
                    {roles.map(item => (
                        // if this is our value, use it as defaul selection
                        <MenuItem onClick={passingProps} value={item["user_role_id"]}>{item["role_type"]}</MenuItem>
                    ))}
                </Select>
                {passedError && <span 
                class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-k4qjio-MuiFormHelperText-root"
                style={{ color: 'red' }}>{passedError}</span>}
            </FormControl>

    );
} // end of DisplayUsers() function

export default RoleTypes;
