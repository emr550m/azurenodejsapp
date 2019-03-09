var db = require("../../../db/mongo");

module.exports = function (request, response) {
    return new Promise(function (resolve, reject) {
        var result = {
            success: false,
            message: ""
        }

        var { username } = request.body;
        if (username) {
            db.SelectDB("users", { username }, {}).then(function (userResult) {
                if (userResult.length > 0) {
                    result.success = true;
                    result.message = "";
                    result.userinfo = {};
                    result.userinfo.username = userResult[0].username;
                    result.userinfo.name = userResult[0].name;
                    result.userinfo.surname = userResult[0].surname;
                    result.userinfo.lastlogin = userResult[0].lastlogin;

                    resolve(result)
                } else {
                    result.success = false;
                    result.message = "Error";
                    reject(result)
                }
            }).catch(function (err) {
                result.success = false;
                result.message = "Error";
                reject(result)
            })

        } else {
            result.success = false;
            result.message = "Error";
            reject(result)
        }
    });

};