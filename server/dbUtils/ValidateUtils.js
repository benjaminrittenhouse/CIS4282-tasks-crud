
const validateUtils = {}

const formatUtils = require("./FormatUtils")
// error object if we need to send it back
const errorObj = {
    "isError": "true",
    "webUserId": "",
    "userEmail": "",
    "userPassword": "",
    "userPassword2": "",
    "image": "",
    "birthday": "",
    "membershipFee": "",
    "userRoleId": "",
    "errorMsg": ""
}

// convert to store in database format
validateUtils.dateConversion = function(date){
    try {  
        var dateFormat = new Date(date);
        return dateFormat;
    } catch (err){
        return "Bad date in FormatUtils.formatDate: " + err;
    }
}

// convert decimal to database format
validateUtils.decimalConversion = function(val){
    if ((val == null) || (val.length == 0)) {
        return null;  // Since this field is not required, empty string is valid user entry.
    }
    val = val.replace("$", ""); // removes $
    val = val.replace(",", ""); // removes ,

    try{
        val = parseFloat(val);
        return val;
    } catch(err){
        System.out.println("FormatUtils.decimalConversion: cannot convert " + val + " to float (decimal)");
        return null;
    }
}

// determine if date is valid, otherwise send error
validateUtils.validateDate = function (dateStr, reqd) {
    // console.log("doing date validation: " + dateStr);
    console.log("Datestr: " + dateStr);
    if (!reqd && (dateStr === null || dateStr === "")) {
        return "";
    } else {
            // Check format and convert to MM/DD/YYYY if needed
            var dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
            var match = dateRegex.exec(dateStr);
            console.log("Match? " + match);
            if (!match) {
              return "Invalid date format";
            }

            var month = match[1].padStart(2, '0');
            var day = match[2].padStart(2, '0');
            var year = match[3];
            var formattedDate = `${month}/${day}/${year}`;
          
            // Check validity
            var dateParts = formattedDate.split('/');
            var year = parseInt(dateParts[2]);
            var month = parseInt(dateParts[0]) - 1; // months are 0-indexed in Date
            var day = parseInt(dateParts[1]);
            var date = new Date(year, month, day);
            
            // dates good
            if(date.getFullYear() === year && date.getMonth() === month && date.getDate() === day && day <= new Date(year, month + 1, 0).getDate()){
                return "";
            }
          
    }

    return "Please enter a valid date";
}

//Formatting membership fee before sending the result
validateUtils.validateFloat = function (float, reqd) {
    if (reqd && float === null) {
        return "Please enter a float (required)";
    } else if ((float === "" || float === null) && !reqd) {
        return "";
    } else {
        float = float.replace('$', '');
        float = float.replace(',', '');

        var value = parseFloat(float);

        if (!isNaN(value)) {
            return "";
        }

        return "Please enter a valid float.";
    }
}

// Foreign key where the key is an integer and the value is a string (web user ID 1, name Abigail Smith, for ex.)
validateUtils.validateForeignKey = function (val, reqd) {
    if(reqd && (val === null || val === "")){
        return "Please enter a value (required)"
    } else {
        return "";
    }
}

/* helper for format currency (NOT IN USE)
function isFloat(value) {
    var regex = /^\d+(?:\.\d{0,2})$/;
    if (regex.test(value)) {
        return true;
    }

    return false;
}

// regex check for date (NOT IN USE)
function isDate(date) {
    var regex = /^(0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$/;
    return regex.test(date);
}*/

// verify email with regex
validateUtils.validateEmail = function (email, reqd) {
    if (reqd && (email === null || email === "")) {
        return "Please enter an email (required)";
    }

    if (!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return "Invalid email format";
    } else {
        return "";
    }
}

// check string
validateUtils.validateString = function (string, minLen, reqd) {
    if ((string === null || string.length === 0) && reqd) {
        return "Please enter a string (required)";
    } else if (string.length < minLen) {
        return "Must be at least " + minLen + " chars";
    } else {
        return "";
    }
}

// check password length
validateUtils.compareStrings = function (s1, s2) {
    if (s1 == null || s2 == null) {
        return "When comparing strings, both strings are needed.";
    }

    if (s1 !== s2) {
        return "Strings do not match.";
    } else {
        return "";
    }
}

// check user role
validateUtils.validateInteger = function (intVal, reqd) {
    if (reqd && intVal === "") {
        return "Please enter an integer (required)";
    } else if(intVal !== ""){
        intVal = intVal.replace('$', '');
        intVal = intVal.replace(',', '');

        var num = Number(intVal);
        var check = parseInt(intVal);
        
        if (isNaN(num) || check !== num || intVal.length !== check.toString().length) {
            return "Invalid integer"
        } else {
            return "";
        }
    }
}

module.exports = validateUtils;