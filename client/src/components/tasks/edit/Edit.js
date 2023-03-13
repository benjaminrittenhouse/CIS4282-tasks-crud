import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';

import "./edit.css"


function Edit({ props, setIsEditing, assignedUser }) {
    const [webUserName, setWebUserName] = useState(props.assignedWebUser)

    // hide / show modal
    // COOL: way to change state from a child component!!
    function handleClose() {
        setIsEditing(false);
    }

    const [insertMessage, setInsertMessage] = useState("");

    const [names, setNames] = useState("");
    const [assignedName, setAssignedName] = useState("");


    const [inputVal, setInputVal] = useState(assignedUser);
    const [buttonVal, setButtonVal] = useState(inputVal);

    const handleChange = (event) => {
        setWebUserName(event.target.value);
    }

    const handleClick = () => {
        setButtonVal(webUserName)
        handleSearch(webUserName)
    }

    const location = useLocation();
    // state message variable to keep track of which was sent most recently... either error object or webUser object
    const [updateMessage, setUpdateMessage] = useState("");

    const [taskData, setTaskData] = useState({});

    const [errorObj, setErrorObj] = useState({});


    // used to set error object back to nothing
    const emptyData = {}

    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };


    // set user data once
    useEffect(() => {
        setTaskData(props);
    }, []);

    async function handleSearch(inp) {
        try {

            // const objToStr = new URLSearchParams(inp).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/queryUsers?firstName=${inp}`;

            // console log the API fetch call
            console.log("STR w/ Task OBJ: " + str);
           
            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            console.log("Data returned from API call: " + JSON.stringify(data));


            setNames(data);
            setAssignedName(inp)
            // check if data is an eror objec
            if(data.isError) {
                setErrorObj(data);
                console.log("setting error (task) data...");
            } else {
                console.log("setting task data...");
                // clear the previous messages from errors when we successfully insert
                setErrorObj(emptyData);
                // setTaskData(data);
            }

            setInsertMessage(data.errorMsg);
            
        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }

    async function updateTask() {
        try {

            const objToStr = new URLSearchParams(taskData).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/updateTask?${objToStr}`;

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
            }

            setUpdateMessage(data.errorMsg);

            
        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }

    // set input to name, set id to web user
    function handleWebUser(num, name) {
        setTaskData({...taskData, assignedWebUserID: num})
        setInputVal(name)
        setNames([])
        setWebUserName(name)
    }



    return (
        <div className="edit">
            <button type="button" className="xButton" onClick={handleClose}>X</button>
            <h2>Editing {taskData.taskName}</h2>
            <table className="insertArea">
                <tbody>
                <tr>
                        <td className="textTd">Name</td>
                        <td className="inputTd">
                            <input placeholder ="Take out trash..." value={taskData.taskName} onChange=
                                {e => setTaskData({...taskData, taskName: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.taskName}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Description</td>
                        <td className="inputTd">
                            <input placeholder="Sideyard" value={taskData.taskDesc} onChange=
                                {e => setTaskData({...taskData, taskDesc: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.taskDesc}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Points</td>
                        <td className="inputTd">
                            <input placeholder ="8" value={taskData.taskPoints} onChange=
                                {e => setTaskData({...taskData, taskPoints: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.taskPoints}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Target Date</td>
                        <td className="inputTd">
                            <input placeholder="mm/dd/yyyy" value={taskData.targetDate} onChange=
                                 {e => setTaskData({...taskData, targetDate: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.targetDate}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Completion Date</td>
                        <td className="inputTd">
                            <input placeholder="mm/dd/yyyy" value={taskData.completionDate} onChange=
                                {e => setTaskData({...taskData, completionDate: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.completionDate}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Assigned User</td>
                        <td className="assignedUserContainerEdit">
                            <input type="text" className="nameInput" name="inputVal" placeholder ="Search..." value={webUserName}
                            onChange={handleChange}
                                />
                            <button onClick={handleClick}>Search</button>
                            {/* list of names below input field */}
                            <ul className = "names">
                            {names.length > 0 ? 
                            (
                                
                                names.map((ele) => (
                                <option 
                                value={ele.web_user_id}
                                onClick={() => handleWebUser(ele.web_user_id, ele.first_name + " " + ele.last_name)}

                                >
                                    {ele.first_name + " " + ele.last_name}
                                </option>
                                )
                            
                            )
                            ) 
                            : 
                            (<option value="No names"/>)}
                            </ul>
                        </td>
                        <td className="error">
                            {errorObj.assignedWebUserID}
                        </td>
                    </tr>

                    <tr>

                        <td className="error" colSpan="2">
                            <br />
                                {/* TO DO : re-render this so we see record inserted, when we first get an error, and then insert again*/}
                                {insertMessage}
                            <div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="buttons">
                <button type="button" className="saveButton" onClick={updateTask}>Save</button>
                <button type="button" className="cancelButton" onClick={handleClose}>Cancel</button>
            </div>

            <div>
                {updateMessage}
            </div>

        </div>
    )
}

export default Edit;