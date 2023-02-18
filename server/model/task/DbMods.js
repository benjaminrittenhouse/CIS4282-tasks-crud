const formatUtils = require("../../dbUtils/FormatUtils");
const validateUtils = require("../../dbUtils/ValidateUtils");
const { compareStrings } = require("../../dbUtils/ValidateUtils");

const DbMods = {}


// call all formats, and either return an error object or a user object
var task = {}

// format web user
DbMods.formatTask = function(taskObj){
    task = {};

    task.task_id = formatUtils.plainInteger(taskObj.web_user_id);
    task.task_name = formatUtils.formatString(taskObj.task_name);
    task.task_desc = formatUtils.formatString(taskObj.task_desc);
    task.task_points = formatUtils.formatString(taskObj.task_points);
    task.target_date = formatUtils.formatDate(taskObj.target_Date);
    task.completion_date = formatUtils.formatString(taskObj.completion_date);
    task.assigned_web_user_id = formatUtils.formatInteger(taskObj.assigned_web_user_id);
    
    return task;
}


// validate web user 
DbMods.validateTask = function(taskObj){
    var errorObj = {};
    errorObj.isError = "true";

    // errorObj.taskId = validateUtils.validateInteger(taskObj.taskId, true);
    errorObj.taskName = validateUtils.validateString(taskObj.taskName, true);

                                                        // password, min length for password
    errorObj.taskDesc = validateUtils.validateString(taskObj.taskDesc, 5, true);
    errorObj.taskPoints = validateUtils.validateInteger(taskObj.taskPoints, true);

    errorObj.targetDate = validateUtils.validateDate(taskObj.targetDate, true);
    errorObj.completionDate = validateUtils.validateDate(taskObj.completionDate, false);
    errorObj.assignedWebUserID = validateUtils.validateFloat(taskObj.assignedWebUserID, false);
    

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

    taskObj.targetDate = formatUtils.dateConversion(taskObj.targetDate);
    taskObj.completionDate = formatUtils.dateConversion(taskObj.completionDate);

    return taskObj;
}

// function to determine if there are any errors currently
function checkErrors(errorObj){
    // there are errors
    if(errorObj.taskName.length > 0 || errorObj.taskDesc.length > 0 || errorObj.taskPoints.length > 0 
        || errorObj.targetDate.length > 0 || errorObj.completionDate.length > 0 || errorObj.assignedWebUserID.length > 0) 
        
        return true;

    // there are no errors
    return false;
}

module.exports = DbMods