import { React, useState } from 'react';
import RoleTypes from '../../components/webUser/RoleTypes'

function Insert(props) {

    const [userRoleId, setUserRoleId] = useState();
    const [insertMessage, setInsertMessage] = useState("");
    const [userData, setUserData] = useState({});
    const [errorObj, setErrorObj] = useState({})


    // used to set error object back to nothing
    const emptyData = {}

    // set prop helper method
    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };

    const [roleList, setRoleList] = useState([]);

    const [sqlMessage, setSqlMessage] = useState("");


    //an asynchronous function that will either return the API data or an error
    async function insertUser() {
        try {

            const objToStr = new URLSearchParams(userData).toString();
            const str = `${process.env.REACT_APP_API_URL}/api/insertUser?${objToStr}`;

            // console log the API fetch call
            console.log("STR w/ OBJ: " + str);
           
            // await json response & grab json
            const res = await fetch(str);
            const data = await res.json();

            // print data returned from API call
            console.log("Data returned from API call: " + JSON.stringify(data));

            // check if data is an eror objec
            if(data.isError) {
                setErrorObj(data);
                console.log("setting error data...");
            } else {
                console.log("setting user data...");
                // clear the previous messages from errors when we successfully insert
                setErrorObj(emptyData);
                // setUserData(data);
            }

            setInsertMessage(data.errorMsg);
            
        } catch (err) {
            //error catching for when fetch fails
            console.log("err (caught fetch):" + String(err));
        }
    }


    return (
        <div className="spaPage">
            <h2 className="heading">Insert Page</h2>
            <table className="insertArea">
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input placeholder ="example@mail.com" value={userData.userEmail} onChange=
                                {e => setUserData({...userData, userEmail: e.target.value})}
                            /> 
                        </td>
                        <td className="error">
                            {errorObj.userEmail}
                        </td>
                    </tr>

                    <tr>
                        <td>First Name</td>
                        <td>
                            <input placeholder ="Johnny" value={userData.firstName} onChange=
                                {e => setUserData({...userData, firstName: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.firstName}
                        </td>
                    </tr>

                    <tr>
                        <td>Last Name</td>
                        <td>
                            <input placeholder ="Appleseed" value={userData.lastName} onChange=
                                {e => setUserData({...userData, lastName: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.firstName}
                        </td>
                    </tr>

                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" value={userData.userPassword} onChange=
                                {e => setUserData({...userData, userPassword: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userPassword}
                        </td>
                    </tr>
                    <tr>
                        <td>Re-enter Password</td>
                        <td>
                            <input type="password" value={userData.userPassword2} onChange=
                                {e => setUserData(setProp(userData, "userPassword2", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userPassword2}
                        </td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <input value={userData.image} onChange=
                                {e => setUserData(setProp(userData, "image", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.image}
                        </td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td>
                            <input placeholder="mm/dd/yyyy" value={userData.birthday} onChange=
                                {e => setUserData(setProp(userData, "birthday", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.birthday}
                        </td>
                    </tr>
                    <tr>
                        <td>Membership Fee</td>
                        <td>
                            <input placeholder ="$100.00"value={userData.membershipFee} onChange=
                                {e => setUserData(setProp(userData, "membershipFee", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.membershipFee}
                        </td>
                    </tr>

                    <tr>
                        <td>Room #:</td>
                        <td>
                            <input placeholder ="111"value={userData.roomNumber} onChange=
                                {e => setUserData(setProp(userData, "roomNumber", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.roomNumber}
                        </td>
                    </tr>

                    <tr>
                        <td>Role</td>
                        <td>
                            {/* use component RoleTypes to get selection from DB in dropdown list (see RoleTypes.js) */}
                            <RoleTypes 
                                value={userData.userRoleId}
                                getUserRoleId={(u) => setUserData(setProp(userData, "userRoleId", u))}
                            />                        
                        </td>
                        <td className="error">
                            {errorObj.userRoleId}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <button type="button" onClick={insertUser}>Save</button>
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