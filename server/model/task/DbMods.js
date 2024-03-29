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

    errorObj.targetDate = validateUtils.validateDate(taskObj.targetDate, false);
    errorObj.completionDate = validateUtils.validateDate(taskObj.completionDate, false);
    errorObj.assignedWebUserID = validateUtils.validateForeignKey(taskObj.assignedWebUserID, true);

    errorObj.catID = validateUtils.validateForeignKey(taskObj.catID, true);
    

    var errs = checkErrors(errorObj)
    
    if(errs){
        return errorObj;
    }

    return taskObj;
}

// use this after task has been validated, insert the stripped values
DbMods.insertTask = function(taskObj){
    if(taskObj.targetDate === "" || taskObj.targetDate === null){
        taskObj.targetDate = null;
    } else {
        taskObj.targetDate = validateUtils.dateConversion(taskObj.targetDate);
    }

    if(taskObj.completionDate === "" || taskObj.completionDate === null){
        taskObj.completionDate = null;
    } else {
        taskObj.completionDate = validateUtils.dateConversion(taskObj.completionDate);
    }

    if(taskObj.assigned_name === "") taskObj.assignedWebUserID = null;


    return taskObj;
}

// function to determine if there are any errors currently
function checkErrors(errorObj){
    // there are errors
    console.log("assigned cat id error: " + errorObj.catID)
    if(errorObj.taskName.length > 0 || errorObj.taskDesc.length > 0 || errorObj.taskPoints.length > 0 
        || errorObj.targetDate.length > 0 || errorObj.completionDate.length > 0 || errorObj.assignedWebUserID.length > 0
        || errorObj.catID.length > 0) 
        
        return true;

    // there are no errors
    return false;
}

module.exports = DbMods