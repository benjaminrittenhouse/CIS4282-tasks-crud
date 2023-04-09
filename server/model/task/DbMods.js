const formatUtils = require("../../dbUtils/FormatUtils");
const validateUtils = require("../../dbUtils/ValidateUtils");
const { compareStrings } = require("../../dbUtils/ValidateUtils");

const DbMods = {}


// call all formats, and either return an error object or a user object
var task = {}

// format web user
DbMods.formatTask = function(taskObj){
    task = {};

    task.task_id = taskObj.task_id;
    task.task_name = formatUtils.formatString(taskObj.task_name);
    task.task_desc = formatUtils.formatString(taskObj.task_desc);
    task.task_points = formatUtils.formatString(taskObj.task_points);
    task.target_date = formatUtils.formatDate(taskObj.target_date);
    task.completion_date = formatUtils.formatDate(taskObj.completion_date);
    task.assigned_web_user_id = formatUtils.formatInteger(taskObj.assigned_web_user_id);
    task.first_name = formatUtils.formatString(taskObj.first_name);
    task.last_name = formatUtils.formatString(taskObj.last_name);

    // testing
    task.cat_icon = formatUtils.formatString(taskObj.cat_icon);
    task.cat_id = formatUtils.formatString(taskObj.cat_id);
    task.cat_name = formatUtils.formatString(taskObj.cat_name);
    
    return task;
}


// validate web user 
DbMods.validateTask = function(taskObj){
    console.dir(taskObj);
    var errorObj = {};
    errorObj.isError = "true";



    // errorObj.taskId = validateUtils.validateInteger(taskObj.taskId, true);
    errorObj.taskName = validateUtils.validateString(taskObj.taskName, 0, true);

                                                        // password, min length for password
    errorObj.taskDesc = validateUtils.validateString(taskObj.taskDesc, 5, true);
    errorObj.taskPoints = validateUtils.validateInteger(taskObj.taskPoints, true);

    errorObj.targetDate = validateUtils.validateDate(taskObj.targetDate, true);
    errorObj.completionDate = validateUtils.validateDate(taskObj.completionDate, false);
    errorObj.assignedWebUserID = validateUtils.validateForeignKey(taskObj.assignedWebUserID, true);

    errorObj.catName = validateUtils.validateString(taskObj.catName, 0, true);
    

    var errs = checkErrors(errorObj)
    
    if(errs){
        return errorObj;
    }

    return taskObj;
}

// use this after task has been validated, insert the stripped values
DbMods.insertTask = function(taskObj){
    if(taskObj.targetDate === "") taskObj.targetDate = null;
    if(taskObj.completionDate === "") taskObj.completionDate = null;
    if(taskObj.assigned_name === "") taskObj.assignedWebUserID = null;

    taskObj.targetDate = validateUtils.dateConversion(taskObj.targetDate);
    taskObj.completionDate = validateUtils.dateConversion(taskObj.completionDate);
    // taskObj.catID = validateUtils.validateString(taskObj.catID);

    return taskObj;
}

// function to determine if there are any errors currently
function checkErrors(errorObj){
    // there are errors
    console.log("assigned id error: " + errorObj.assignedWebUserID)
    if(errorObj.taskName.length > 0 || errorObj.taskDesc.length > 0 || errorObj.taskPoints.length > 0 
        || errorObj.targetDate.length > 0 || errorObj.completionDate.length > 0 || errorObj.assignedWebUserID.length > 0
        || errorObj.catName.length > 0) 
        
        return true;

    // there are no errors
    return false;
}

module.exports = DbMods