import { React, useEffect, useState } from 'react';

function Dropdown({ names, handleClick, handleChange, recent, webUserName, handleWebUser, handleMore }) {
    const [numUsers, setNumUsers] = useState(0)

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


    useEffect(() => {
        handleNumUsers(webUserName, recent)
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
                <ul className="names">
                    {names.length > 0 ? (
                        <>
                            {names.map((ele) => (
                                <option
                                    value={ele.web_user_id}
                                    onClick={() => handleWebUser(ele.web_user_id, ele.first_name + " " + ele.last_name)}
                                >
                                    {ele.first_name + " " + ele.last_name}
                                </option>
                                
                            ))}
                            {names.length === 10 && numUsers > 10 ? (<option onClick={()=>handleMore(webUserName, recent)}>More...</option>) : (null)}
                        </>
                    ) : (
                        <option value="No names">No names.</option>
                    )}
                </ul>

            </td>
        </>
    )
}

export default Dropdown;