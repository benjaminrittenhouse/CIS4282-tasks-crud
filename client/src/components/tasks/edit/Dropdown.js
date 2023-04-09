import { React, useEffect, useState } from 'react';
import { Alert, AlertTitle } from "@mui/material";

function Dropdown({assignedWebUserID, dropdownName, listItems, handleClick, handleChange, recent, selectedValue, handleSelect, handleMore, numItems }) {

    
    useEffect(() => {
        // handleWebUser();
        // handleClick();
      }, []);

    return (
        <>
            <td className="textTd">{dropdownName}</td>
            <td className="assignedUserContainerEdit">
                <input type="text" className="nameInput" name="inputVal" placeholder="Type starting chars and click search..." value={selectedValue}
                    onChange={handleChange}
                />

                {(assignedWebUserID === null || assignedWebUserID === "") ? (
                    <Alert severity="error" className="alert" style={{position: 'absolute', top: '1.5rem', left: '1rem'}}>
                       Changes made. Select a user before saving.
                    </Alert>
                ) : (
                    <></>
                )}

                <button onClick={handleClick}>Search</button>
                {/* list of names below input field */}
                
                    {listItems.length > 0 ? (
                        <ul className="names">
                            {listItems.map((ele) => (
                                <option
                                    value={ele.web_user_id}
                                    onClick={() => handleSelect(ele.web_user_id, ele.first_name + " " + ele.last_name)}
                                >
                                    {ele.first_name + " " + ele.last_name}
                                    
                                </option>
                                
                            ))}
                            {listItems.length === 10 && numItems > 10 ? (<option onClick={()=>handleMore(selectedValue, recent)}>More...</option>) : (null)}
                        </ul>
                    ) : (
                       <>
                       </>
                    )}

            </td>
        </>
    )
}

export default Dropdown;