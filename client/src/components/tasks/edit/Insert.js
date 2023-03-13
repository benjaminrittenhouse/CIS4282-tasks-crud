import { React, useState, useEffect } from 'react';
import "./edit.css"

function Insert(props) {
    const [insertMessage, setInsertMessage] = useState("");

    const [names, setNames] = useState([]);

    const [webUserName, setWebUserName] = useState("")


    const [assignedName, setAssignedName] = useState("");

    const [inputVal, setInputVal] = useState("");
    const [buttonVal, setButtonVal] = useState(inputVal);

    const handleChange = (event) => {
        setWebUserName(event.target.value);
    }

    const handleClick = () => {
        setButtonVal(webUserName)
        handleSearch(webUserName)
    }

    const [taskData, setTaskData] = useState({});


    function testData(e) {
        console.log("E: ");
        console.dir(e);
    }


    // error object
    const [errorObj, setErrorObj] = useState({})


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
                            <input placeholder="Sideyard" value={taskData.taskDesc} onChange=
                                {e => setTaskData({ ...taskData, taskDesc: e.target.value })}
                            />
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
                        <td className="textTd">Assigned User</td>
                        <td className="assignedUserContainerInsert">
                            <input type="text" className="nameInput" name="inputVal" placeholder="Search..." value={webUserName}
                                onChange={handleChange}
                            />
                            <button onClick={handleClick}>Search</button>
                            {/* list of names below input field */}
                            <ul className="names">
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
                                    (<option value="No names" />)}
                            </ul>
                        </td>
                        <td className="error">
                            {errorObj.assignedWebUserID}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <br />
                            <button type="button" onClick={insertTask}>Save</button>
                        </td>
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

        </div>
    )
}

export default Insert;