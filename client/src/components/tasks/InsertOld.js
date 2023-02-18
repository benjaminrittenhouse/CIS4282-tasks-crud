import { React, useState, useEffect } from 'react';
import RoleTypes from '../../components/webUser/RoleTypes'

function Insert(props) {
    const [insertMessage, setInsertMessage] = useState("");

    const [names, setNames] = useState("");
    
    const [taskData, setTaskData] = useState(
        {
            // "taskID": "",
            "taskName": "",
            "taskDesc": "",
            "taskPoints": "",
            "targetDate": "",
            "completionDate": "",
            "assignedWebUserID": "",
        }
    );


    function testData(e){
        console.log("E: ");
        console.dir(e);
    }


    // error object
    const [errorObj, setErrorObj] = useState(
        {
            "taskID": "",
            "taskName": "",
            "taskDesc": "",
            "taskPoints": "",
            "targetDate": "",
            "completionDate": "",
            "assignedWebUserID": "",
        }
    )


    // used to set error object back to nothing
    const emptyData = {
        "taskID": "",
        "taskName": "",
        "taskDesc": "",
        "taskPoints": "",
        "targetDate": "",
        "completionDate": "",
        "assignedWebUserID": "",
    }

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

    function handleInputBlur(event) {
        // Update the state with the web_user_id when the input field loses focus
        const selectedOption = document.querySelector(`#data option[value="${event.target.value}"]`);
          console.log("VALUE: " + selectedOption.dataset.value);
        
      }

    return (
        <div className="spaPage">
            <h2 className="heading">Task Insert Page</h2>
            <table className="insertArea">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input placeholder ="Take out trash..." value={taskData.taskName} onChange=
                                {e => setTaskData({...taskData, taskName: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.taskName}
                        </td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>
                            <input placeholder="Sideyard" value={taskData.taskDesc} onChange=
                                {e => setTaskData({...taskData, taskDesc: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.taskDesc}
                        </td>
                    </tr>
                    <tr>
                        <td>Points</td>
                        <td>
                            <input placeholder ="8" value={taskData.taskPoints} onChange=
                                {e => setTaskData({...taskData, taskPoints: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.taskDesc}
                        </td>
                    </tr>
                    <tr>
                        <td>Target Date</td>
                        <td>
                            <input placeholder="mm/dd/yyyy" value={taskData.targetDate} onChange=
                                 {e => setTaskData({...taskData, targetDate: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.targetDate}
                        </td>
                    </tr>
                    <tr>
                        <td>Completion Date</td>
                        <td>
                            <input placeholder="mm/dd/yyyy" value={taskData.completionDate} onChange=
                                {e => setTaskData({...taskData, completionDate: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.completionDate}
                        </td>
                    </tr>
                    <tr>
                        <td>Assigned User</td>
                        <td>
                            <input type="text" list="data" placeholder ="Search..." /*value={taskData.assignedWebUserID}*/ onChange=
                                // {e => setTaskData({...taskData, assignedWebUserID: e.target.dataset.value},handleSearch(e.target.value), console.log("YO:" + e.target.dataset))}
                                {e => handleSearch(e.target.value)}
                                onBlur={handleInputBlur}
                            />
                            <datalist id ="data">
                
                            {names.length > 0 ? 
                            (names.map((ele, index) => (
                                <option 
                                data-value={ele.web_user_id}
                                value={ele.first_name + " " + ele.last_name}
                                />
                            )))
                            :
                            (
                                <option value="No names"/>
                            )
                            }

                            </datalist>
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