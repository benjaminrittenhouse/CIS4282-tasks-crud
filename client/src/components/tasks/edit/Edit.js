import React , { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import Dropdown from "./Dropdown"
import "./edit.css"

import Categories from './Categories';

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
    const [dirtyFlag, setDirtyFlag] = useState(false) 


    const [inputVal, setInputVal] = useState(assignedUser);
    const [buttonVal, setButtonVal] = useState(inputVal);

    const handleChange = (event) => {
        setWebUserName(event.target.value);
        setTaskData({ ...taskData, assignedWebUserID: "" })
    }

    const handleClick = () => {
        console.log("web user name " + webUserName)
        setButtonVal(webUserName)
        handleSearch(webUserName, "");
        handleNumUsers(webUserName, recent)
        if(numUsers === 0){
            setDirtyFlag(true)
            console.log("DIRTY FLAG IS TRUE")
        }
    }

    const location = useLocation();
    // state message variable to keep track of which was sent most recently... either error object or webUser object
    const [updateMessage, setUpdateMessage] = useState("");

    const [taskData, setTaskData] = useState({});

    const [errorObj, setErrorObj] = useState({});

    const [numUsers, setNumUsers] = useState(0);

    // last name that will be populated into list (before More...)
    const [recent, setRecent] = useState("");


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

    async function handleSearch(searchName, t) {
        try {

            // const objToStr = new URLSearchParams(inp).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/queryUsers?searchName=${searchName}&threshold=${t}`;

            // console log the API fetch call
            console.log("STR w/ Task OBJ: " + str);
           
            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            console.log("Data returned from API call: " + JSON.stringify(data));


            setNames(data);
            setAssignedName(searchName)
            setRecent(names[names.length-1].last_name + ", " + names[names.length-1].first_name)
            console.log("recent: " + recent)
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

            /*
            if(numUsers === 0 && taskData.assignedWebUserID !== ""){
                setDirtyFlag(true)
            } else {
                setDirtyFlag(false)
            }
            */
        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }

   async function handleNumUsers(fn, t) {
        try {

            // const objToStr = new URLSearchParams(inp).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/getNumberUsers?firstName=${fn}&threshold=${t}`;

            // console log the API fetch call
            console.log("STR w/ Task OBJ: " + str);
           
            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            console.log("Data returned from NUMBERS APII call: " + Number(data[0].count));

            setNumUsers(Number(data[0].count))

            if(numUsers === 0){
                console.log("NUM USERS IS THIS " + numUsers);

                setDirtyFlag(true)
            }
            
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
        setDirtyFlag(false)
    }



    return (
        <div className="editArea tasks edit">
            <button type="button" className="xButton" onClick={handleClose}>X</button>
            <h2>Editing {taskData.taskName}</h2>
            <div class="row">
                <span class="prompt">Name:</span>
                <input placeholder="Take out trash..." value={taskData.taskName} onChange=
                    {e => setTaskData({ ...taskData, taskName: e.target.value })}
                />
                <span class="error">{errorObj.taskName}</span>
            </div>
            <div class="row">
                <span class="prompt">Description:</span>
                <textarea placeholder="This task is about..." value={taskData.taskDesc} onChange=
                    {e => setTaskData({ ...taskData, taskDesc: e.target.value })}
                />
                <span class="error">{errorObj.taskDesck}</span>
            </div>
            <div class="row">
                <span class="prompt">Points:</span>
                <input placeholder="8" value={taskData.taskPoints} onChange=
                    {e => setTaskData({ ...taskData, taskPoints: e.target.value })}
                />
                <span class="error">{errorObj.taskPoints}</span>
            </div>
            <div class="row">
                <span class="prompt">Target Date:</span>
                <input placeholder="mm/dd/yyyy" value={taskData.targetDate} onChange=
                    {e => setTaskData({ ...taskData, targetDate: e.target.value })}
                />
                <span class="error">{errorObj.targetDate}</span>
            </div>
            <div class="row">
                <span class="prompt">Completion Date:</span>
                <input placeholder="mm/dd/yyyy" value={taskData.completionDate} onChange=
                    {e => setTaskData({ ...taskData, completionDate: e.target.value })}
                />
                <span class="error">{errorObj.completionDate}</span>
            </div>
            <div class="row">
                <span class="prompt">Category:</span>
                <Categories
                    value={taskData.catID}
                    getUserCategoryId={(u) => setTaskData(setProp(taskData, "catID", u))}
                />
                <span class="error">{errorObj.catID}</span>
            </div>
            <div class="row">
                <span class="prompt">Assigned User</span>
                <Dropdown listItems={names}
                    handleClick={handleClick}
                    handleChange={handleChange}
                    dropdownName={"Assigned User"}
                    selectedValue={webUserName}
                    handleSelect={handleWebUser}
                    numItems={numUsers}
                    handleMore={handleSearch}
                    recent={recent}
                    assignedWebUserID={taskData.assignedWebUserID}
                    dirtyFlag={dirtyFlag}
                />
                <span class="error">{errorObj.assignedWebUserID}</span>
            </div>

            <br />
            <div class="buttonsAndMessage">
            <button type="button" className="saveButton" onClick={updateTask}>Save</button>
                <button type="button" className="cancelButton" onClick={handleClose}>Cancel</button>
                <div class="recLevelMsg">{updateMessage}</div>
            </div>

        </div>
    )
}

export default Edit;