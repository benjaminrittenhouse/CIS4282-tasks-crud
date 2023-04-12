const formatUtils = require("../../dbUtils/FormatUtils");
const validateUtils = require("../../dbUtils/ValidateUtils");
// const { compareStrings } = require("../../dbUtils/ValidateUtils");

const DbMods = {}


// call all formats, and either return an error object or a user object
var webUser = {}

// format web user
DbMods.formatWebUser = function(userObj){
    webUser = {};

    webUser.web_user_id = formatUtils.plainInteger(userObj.web_user_id);
    webUser.user_email = formatUtils.formatString(userObj.user_email);
    webUser.first_name = formatUtils.formatString(userObj.first_name);
    webUser.last_name = formatUtils.formatString(userObj.last_name);
    webUser.user_password = formatUtils.formatString(userObj.user_password);
    webUser.image = formatUtils.formatString(userObj.image);
    webUser.birthday = formatUtils.formatDate(userObj.birthday);
    webUser.membership_fee = formatUtils.formatCurrency(userObj.membership_fee);
    webUser.room_number = formatUtils.plainInteger(userObj.room_number);
    webUser.user_role_id = formatUtils.plainInteger(userObj.user_role_id);
    webUser.role_type = formatUtils.formatString(userObj.role_type);

    return webUser;
}


// validate web user 
DbMods.validateWebUser = function(userObj){
    var errorObj = {};
    errorObj.isError = "true";

    // errorObj.webUserId = validateUtils.validateInteger(userObj.webUserId, true);
    errorObj.userEmail = validateUtils.validateEmail(userObj.userEmail, true);

                                                        // password, min length for password
    errorObj.userPassword = validateUtils.validateString(userObj.userPassword, 5, true);
    errorObj.userPassword2 = validateUtils.compareStrings(userObj.userPassword, userObj.userPassword2);

    errorObj.image = validateUtils.validateString(userObj.image, 0, false);
    errorObj.birthday = validateUtils.validateDate(userObj.birthday, false);
    errorObj.membershipFee = validateUtils.validateFloat(userObj.membershipFee, false);
    errorObj.roomNumber = validateUtils.validateInteger(userObj.roomNumber, false);
    errorObj.userRoleId = validateUtils.validateForeignKey(userObj.userRoleId, true);
    errorObj.firstName = validateUtils.validateString(userObj.firstName, 1, true);
    errorObj.lastName = validateUtils.validateString(userObj.lastName, 1, true);

    

    var errs = checkErrors(errorObj)
    
    if(errs){
        return errorObj;
    }

    return userObj;
}

// use this after webuser has been validated, insert the stripped values
DbMods.insertWebUser = function(userObj){
    userObj.membershipFee = validateUtils.decimalConversion(userObj.membershipFee);
    userObj.birthday = validateUtils.dateConversion(userObj.birthday);

    if(userObj.membershipFee === "") userObj.membershipFee = null;
    if(userObj.birthday === "") userObj.birthday = null;
    if(userObj.image === "") userObj.image = null;
    if(userObj.roomNumber === "") userObj.roomNumber = null;

    return userObj;
}

// function to determine if there are any errors currently
function checkErrors(errorObj){
    // there are errors
    if(errorObj.userEmail.length > 0 || errorObj.userPassword.length > 0 || errorObj.membershipFee.length > 0 
        || errorObj.userRoleId.length > 0 || errorObj.birthday.length > 0 || errorObj.image.length > 0 || errorObj.roomNumber.length > 0
        || errorObj.userPassword2.length > 0) return true;

    // there are no errors
    return false;
}

module.exports = DbMods