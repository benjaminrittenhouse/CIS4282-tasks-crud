import React, { useEffect, useState } from 'react';


//This is the function that is being rendered by ReactDOM
function Categories({ getUserCategoryId, value }) {

    var [categories, setCategories] = useState([]);
    
    async function fetchCategories() {
        try {
            const str = `${process.env.REACT_APP_API_URL}/api/listAllCategories`;

            const res = await fetch(str);

            //res.json parses the JSON response and returns a JS Object insead
            const data = await res.json();

            //set our category list array with our JS Object
            var temp = [];
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i]);
            }

            setCategories(temp);
        } catch (err) {
            //error catching
            console.log(err);
        }
    }

    //useEffect will run upon loading the page, this is where we will call our RoleTypes API
    useEffect(() => {
        fetchCategories();
        console.log("Value: " + value)
    }, []);


    const passingProps = (e) => {
        getUserCategoryId(e.target.value);
    }

    return (
        <div className="foreignKey">
            <select onChange={passingProps}>
                <option value="-999">Select a category</option>
                {categories.map(item => {
                    // if this is our value, use it as defaul selection
                    if(item["cat_id"] === value){

                        return <option
                        onClick = {passingProps}
                        value={item["cat_id"]}
                        selected>
                            {item["cat_name"]}
                        </option>;

                    // else, normal list item
                    } else {
                        return <option
                        onClick = {passingProps}
                        value={item["cat_id"]}
                        >
                            {item["cat_name"]}
                        </option>;
                    }
                    
                })}
            </select>
        </div>

    );
} // end of DisplayUsers() function

export default Categories;
