import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, listItemSecondaryActionClasses } from "@mui/material";

function Dropdown({ assignedWebUserID, dropdownName, listItems, handleClick, handleChange, recent, selectedValue, handleSelect, handleMore, numItems, dirtyFlag }) {


    useEffect(() => {
        // handleWebUser();
        // handleClick();
    }, []);

    return (
        <div className="dropdown">
            {(assignedWebUserID === null || assignedWebUserID === "") ? (
                    <Alert severity="error" className="alert" >
                        New changes not saved until a user is selected.
                    </Alert>
                ) : (
                    <></>
                )}
            <div className="searchRow">
                <input type="text" className="nameInput" name="inputVal" placeholder="Type starting chars and click search..." value={selectedValue}
                    onChange={handleChange}
                />

                <button onClick={handleClick}>Search</button>

            </div>

            <div className="namesDiv">
                {/* list of names below input field */}

                {listItems.length > 0 ? (
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
            </div>
        </div>
    )
}

export default Dropdown;