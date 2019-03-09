var db = require("../../../db/mongo");

module.exports = function (request, response) {
    return new Promise(function (resolve, reject) {
        var result = {
            success: false,
            message: ""
        }

        var { username, name, surname } = request.body;
        if (username && name && surname) {
            db.SelectDB("users", { username }, {}).then(function (userResult) {
                if (userResult.length > 0) {

                    db.UpdateDB("users", { _id: userResult[0]._id }, {
                        $set: { name: name, surname: surname }
                    }).then(function (userResult) {
                        result.success = true;
                        result.message = "";
                        resolve(result)
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