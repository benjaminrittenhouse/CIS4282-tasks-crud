import { React, useEffect } from 'react';

function Dropdown({ names, handleClick, handleChange, recent, webUserName, handleWebUser, handleMore, numUsers }) {

    useEffect(() => {
        // handleWebUser();
        handleClick();
      }, []);

    return (
        <>
            <td className="textTd">Assigned User</td>
            <td className="assignedUserContainerEdit">
                <input type="text" className="nameInput" name="inputVal" placeholder="Search..." value={webUserName}
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Search</button>
                {/* list of names below input field */}
                
                    {names.length > 0 ? (
                        <ul className="names">
                            {names.map((ele) => (
                                <option
                                    value={ele.web_user_id}
                                    onClick={() => handleWebUser(ele.web_user_id, ele.first_name + " " + ele.last_name)}
                                >
                                    {ele.first_name + " " + ele.last_name}
                                </option>
                                
                            ))}
                            {names.length === 10 && numUsers > 10 ? (<option onClick={()=>handleMore(webUserName, recent)}>More...</option>) : (null)}
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