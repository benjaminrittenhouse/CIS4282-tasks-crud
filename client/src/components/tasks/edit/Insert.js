import React, { useState, useEffect } from 'react';
import "../../../style/editArea.css"
import Dropdown from "./Dropdown"
import Categories from './Categories';

function Insert(props) {
    const [insertMessage, setInsertMessage] = useState("");

    const [dirtyFlag, setDirtyFlag] = useState(false) 

    // assigned user, dirty flag
    const [assignedIsSet, setAssignedIsSet] = useState(false);

    const [names, setNames] = useState([]);

    const [webUserName, setWebUserName] = useState("")

    const [numUsers, setNumUsers] = useState(0);
    const [recent, setRecent] = useState("")

    const [assignedName, setAssignedName] = useState("");

    const [inputVal, setInputVal] = useState("");
    const [buttonVal, setButtonVal] = useState(inputVal);

    const handleChange = (event) => {
        setWebUserName(event.target.value);
        setTaskData({ ...taskData, assignedWebUserID: "" })
    }

    const handleClick = () => {
        setButtonVal(webUserName)
        handleSearch(webUserName, "")
        handleNumUsers(webUserName, recent)
    }

    const [taskData, setTaskData] = useState({});

    // error object
    const [errorObj, setErrorObj] = useState({});

    // used to set error object back to nothing
    const emptyData = {}

    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };

    useEffect(() => {
        // handleSearch("");
    }, []);

    async function insertTask() {
        try {
            const objToStr = new URLSearchParams(taskData).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/insertTask?${objToStr}`;

            // console log the API fetch call
            console.log("STR w/ Task OBJ: " + str);

            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            console.log("Data returned from API call: " + JSON.stringify(data));

            setNames(data);
            // check if data is an eror objec
            if (data.isError) {
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
            console.log("Data returned from NUMBERS API (INSERT) call: " + data[0].count);

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
            setRecent(names[names.length - 1].last_name + ", " + names[names.length - 1].first_name)
            console.log("recent: " + recent)
            // check if data is an eror objec
            if (data.isError) {
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

    // set input to name, set id to web user
    function handleWebUser(num, name) {
        setTaskData({ ...taskData, assignedWebUserID: num })
        setInputVal(name)
        setNames([])
        setWebUserName(name)
        setAssignedIsSet(true)
        setDirtyFlag(false)
    }

    // function to allow a user to upload a .txt file and read the text, store it in a state variable
    function handleFileUpload(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = (e.target.result);
            setTaskData({ ...taskData, taskDesc: text })
        };
        reader.readAsText(file);
    }

    return (
        <div class="editArea tasks insert">
            <h2 className="heading">Create a New Task</h2>
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
                <span class="error">{errorObj.taskDesc}</span>
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
                <button type="button" onClick={insertTask}>Save</button>
                <div class="recLevelMsg">{insertMessage}</div>
            </div>
        </div>
    )
}

export default Insert;