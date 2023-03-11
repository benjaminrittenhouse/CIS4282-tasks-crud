import { React, useEffect, useState } from 'react';


//This is the function that is being rendered by ReactDOM
function RoleTypes({ getUserRoleId, value }) {

    var [roles, setRoles] = useState([]);

    var [role, setRole] = useState("Select a Role");
    
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
        <div className="roleTypes">
            <select onChange={passingProps}>
                <option value="Select a role">Select a value</option>
                {roles.map(item => {
                    // if this is our value, use it as defaul selection
                    if(item["user_role_id"] == value){

                        return <option
                        onClick = {passingProps}
                        value={item["user_role_id"]}
                        selected>
                            {item["role_type"]}
                        </option>;

                    // else, normal list item
                    } else {
                        return <option
                        onClick = {passingProps}
                        value={item["user_role_id"]}
                        >
                            {item["role_type"]}
                        </option>;
                    }
                    
                })}
            </select>
        </div>

    );
} // end of DisplayUsers() function

export default RoleTypes;
