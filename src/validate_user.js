"use strict"


const validateUser = (userName, password, callback) => {
    if(!userName || !password){
        callback("Missing user/password", null)
    } else if(userName === "vincent" && password === "1234") {
        callback(null, "vincent")
    } else {
        callback("not valid", null)
    }
}

module.exports = validateUser