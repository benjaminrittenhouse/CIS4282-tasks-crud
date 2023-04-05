import { React, useState, useEffect } from 'react';
import "./edit.css"
import Dropdown from "./Dropdown"
import Categories from './Categories';

function Insert(props) {
    const [insertMessage, setInsertMessage] = useState("");

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
        setAssignedIsSet(false);
    }

    const handleClick = () => {
        setButtonVal(webUserName)
        handleSearch(webUserName)
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
        handleSearch("");
    }, []);

    async function insertTask() {
        try {

            // assigned user is in a dirty state
           
                console.log("Task data:");
                console.dir(taskData);
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

    // first name, threshold
    async function handleMore(fn, t) {
        try {

            // const objToStr = new URLSearchParams(inp).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/queryGreaterUsers?firstName=${fn}&threshold=${t}`;

            // console log the API fetch call
            console.log("STR w/ Task OBJ: " + str);

            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            console.log("Data returned from API (MORE) call: " + JSON.stringify(data));


            setNames(data);
            setAssignedName(fn)
            setRecent(names[names.length - 1].first_name)
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
            console.log("Data returned from NUMBERS API call: " + data[0].count);

            setNumUsers(Number(data[0].count))

        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }

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
            setRecent(names[names.length - 1].first_name)
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

    // set input to name, set id to web user
    function handleWebUser(num, name) {
        setTaskData({ ...taskData, assignedWebUserID: num })
        setInputVal(name)
        setNames([])
        setWebUserName(name)
        setAssignedIsSet(true)
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
        <div className="edit">
            <h2 className="heading">Task Insert Page</h2>
            <table className="insertArea">
                <tbody>
                    <tr>
                        <td className="textTd">Name</td>
                        <td className="inputTd">
                            <input placeholder="Take out trash..." value={taskData.taskName} onChange=
                                {e => setTaskData({ ...taskData, taskName: e.target.value })}
                            />
                        </td>
                        <td className="error">
                            {errorObj.taskName}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Description</td>
                        <td className="inputTd">
                            <textarea placeholder="This task is about..." value={taskData.taskDesc} onChange=
                                {e => setTaskData({ ...taskData, taskDesc: e.target.value })}
                            />
                        </td>
                        <td className="inputFileTd">
                        <input type="file" onChange={handleFileUpload} accept=".txt" />
                        </td>
                        <td className="error">
                            {errorObj.taskDesc}
                        </td>
                    </tr>
                    <tr>
                        <td className="textTd">Points</td>
                        <td className="inputTd">
                            <input placeholder="8" value={taskData.taskPoints} onChange=
                                {e => setTaskData({ ...taskData, taskPoints: e.target.value })}
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
                                {e => setTaskData({ ...taskData, targetDate: e.target.value })}
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
                                {e => setTaskData({ ...taskData, completionDate: e.target.value })}
                            />
                        </td>
                        <td className="error">
                            {errorObj.completionDate}
                        </td>
                    </tr>

                    <tr>
                        <td className="textTd">Category</td>
                        <td className="inputTd">
                            <Categories
                                value={taskData.catID}
                                getUserCategoryId={(u) => setTaskData(setProp(taskData, "catID", u))}
                            />
                        </td>
                    </tr>

                    <tr>
                        <Dropdown listItems={names}
                            handleClick={handleClick}
                            handleChange={handleChange}
                            selectedValue={webUserName}
                            dropdownName={"Assigned User"}
                            handleSelect={handleWebUser}
                            recent={recent}
                            numItems={numUsers}
                            handleMore={handleMore}
                        />
                    </tr>


                </tbody>
            </table>

            <div className="save">
                <button type="button" onClick={insertTask}>Save</button>
                <div className="message">{insertMessage}</div>
            </div>

        </div>
    )
}

export default Insert;