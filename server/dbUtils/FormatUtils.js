const formatUtils = {}

// format date 
formatUtils.formatDate = function (date) {
    if(date == null || date == ""){
        return "";
    } else {
        try {  
            var dateFormat = new Date(date);
    
            var day = dateFormat.getDate().toString();
            if (day.length < 2) {
                day = "0" + day;
            }
        
            var month = (dateFormat.getMonth() + 1).toString();
            if (month.length < 2) {
                month = "0" + month;
            }
        
            var year = dateFormat.getFullYear().toString();
        
            return month + "/" + day + "/" + year;
        } catch (err){
            return "Bad date in FormatUtils.formatDate: " + err;
        }
    }
}

// format currency (INCOMPLETE)
formatUtils.formatCurrency = function (currency) {
    if(currency == null){
        return "";
    }
    
    var decimal = currency.toString().split(".")[1];
    
    if(decimal != null && decimal.length < 2){
        decimal = decimal + "0";
    }

    try {
        if(!isNaN(currency)){
            var newCurrency = "";
            if(decimal == null){
                newCurrency = "$" + formatUtils.formatInteger(currency);
            } else {
                newCurrency = "$" + formatUtils.formatInteger(currency) + "." + decimal; 
            }
            
            return newCurrency;
        } else {
            throw "Invalid currency, float violation"
        }
    } catch (err) {
        return "Bad currency in FormatUtils.formatCurrency: " + err;
    }
   
}
 /* helper for format currency (NOT BEING USED)
function isFloat(value){
    var regex  = /^\d+(?:\.\d{0,2})$/;
    if (regex.test(value))
        return true;

    return false;
}*/

// format integer with commas (123,456,789)
formatUtils.formatInteger = function(value) {
    if(value == null) return "";

    try {
        if(Number.isInteger(parseInt(value))){
            var parsed = parseInt(value);
            return parsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            throw "Value cannot be casted to an integer!";
        }
    } catch (err) {
        return "Bad integer in FormatUtils.formatInteger: " + err;
    }
}

// format integer without commas, to string
formatUtils.plainInteger = function(value) {
    if(value == null) return "";

    try {
        if(Number.isInteger(parseInt(value))){
            var parsed = parseInt(value); 
            return parsed.toString();
        } else {
            throw "Value cannot be casted to an integer!";
        }
    } catch (err) {
        return "Bad integer in FormatUtils.formatInteger: " + err;
    }
}

// format string
formatUtils.formatString = function(value){
    if(value == null) return "";

    return String(value);
}



module.exports = formatUtils