import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, listItemSecondaryActionClasses } from "@mui/material";

function Dropdown({apiURL}) {

    // value that the user is typing in
    const [searchValue, setSearchValue] = useState("");
    // threshold to sift through names by ("ex. > Ab")
    const [threshold, setThreshold] = useState("");
    // Selected value from dropdown
    const [selectedValue, setSelectedValue] = useState("");

    // list of values
    const [values, setValues] = useState([]);

    // number of values
    const [numValues, setNumValues] = useState(0);

    // error object
    const [errorObj, setErrorObj] = useState({});

    async function handleSearch() {
       try {
            // const objToStr = new URLSearchParams(inp).toString();
            // ?searchName=${searchName}&threshold=${t}
            const str = apiURL + `?searchName=${searchValue}&threshold=${threshold}`;

            // console log the API fetch call
            console.log("STR w/ Task OBJ: " + str);

            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            // console.log("Data returned from API call: " + JSON.stringify(data));



            // setAssignedName(searchName)
            // check if data is an eror objec
            if (data.isError) {
                   setErrorObj(data);
                   console.log("error in dropdown component");
            } else {
                   console.log("dropdown component search success!");
                // clear the previous messages from errors when we successfully insert
                   setErrorObj({});
                   setValues(data);
                   setThreshold(values[values.length - 1].last_name + ", " + values[values.length - 1].first_name)
                   setNumValues(values.length);

                   console.log("Values here:")
                   console.dir(values);

                   console.log("Number of values");
                   console.log(numValues);
            }

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

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        setSelectedValue(event.target.value);
    }

    useEffect(() => {
    }, [values, threshold, numValues]);

    return (
        <div className="dropdown">
            {/*(assignedWebUserID === null || assignedWebUserID === "") ? (
                    <Alert severity="error" className="alert" >
                        New changes not saved until a value is selected.
                    </Alert>
                ) : (
                    <></>
                )*/}
            <div className="searchRow">
                <input type="text" className="nameInput" name="inputVal" placeholder="Type starting chars and click search..." value={selectedValue}
                    onChange={handleSearchChange}
                />

                <button onClick={handleSearch}>Search</button>

            </div>

            {/*<div className="namesDiv">
                {/* list of names below input field */}

                {/*listItems.length > 0 ? (
                    <ul className="names">
                        {listItems.map((ele) => (
                            <option
                                value={ele.web_user_id}
                                onClick={() => handleSelect(ele.web_user_id, ele.last_name + ", " + ele.first_name)}
                            >
                                {ele.last_name + ", " + ele.first_name}

                            </option>

                        ))}
                        {listItems.length === 10 && numItems > 10 ? (<option onClick={() => handleMore(selectedValue, recent)}>More...</option>) : (null)}
                    </ul>
                ) : (
                    <>
                        {dirtyFlag ? (
                            <ul className="names">
                                <option >No such user</option>
                            </ul>
                        ) : (
                            null
                        )}
                    </>
                )}
                        </div>*/}
        </div>
    )
}

export default Dropdown;