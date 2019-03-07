var db = require("../../../db/mongo"); 
var security = require ("../../../utility/security");

module.exports = function (request, response) {

    return new Promise(function (resolve, reject) {

        var result = {
            success: false,
            message: ""
        }

        var { username, password } = request.body;

        if (username && password) {
            db.SelectDB("users", { username }, { name: 1, password: 1, salt:1, surname: 1, username: 1, tokens: 1, _id: 1, lasttry: 1 }).then(function (userResult) {
                if (userResult && userResult.length > 0) {

                    var tokenhash = security.genRandomString(40);
                    var loginTime = new Date();

                    var difference = loginTime - userResult[0].lasttry;

                    if (difference / 1000 > 2) {
                        if (security.checkPassword(userResult[0].password , password , userResult[0].salt )) {
                            var newPass=security.saltHashPassword(password);
                            var tokenItem = {
                                token: tokenhash,
                                time: loginTime
                            };
                            db.UpdateDB("users", { _id: userResult[0]._id },
                                {
                                    $push: {
                                        tokens: {
                                            $each: [tokenItem],
                                            $slice: -5
                                        }
                                    },
                                    $set: { lastlogin: loginTime, lasttry: loginTime, salt: newPass.salt, password: newPass.passwordHash }
                                }).then(function (upres) {

                                    result.success = true;
                                    result.message = "";
                                    result.user = {
                                        username: username,
                                        name: userResult[0].name,
                                        surname: userResult[0].surname
                                    };
                                    result.session = tokenhash;
                                    resolve(result);
                                }).catch((error) => {
                                    result.success = false;
                                    result.message = "Login Error";
                                    reject(result);
                                });

                        } else {
                            result.success = false;
                            result.message = "Login Error";
                            reject(result);
                        }

                    } else {

                        db.UpdateDB("users", { _id: userResult[0]._id },
                            {
                                $set: { lasttry: loginTime }
                            }).then(function (upres) {
                                result.success = false;
                                result.ddos = true;
                                result.message = "Login Error DDOS";
                                reject(result);
                            }).catch((error) => {
                                result.success = false;
                                result.ddos = true;
                                result.message = "Login Error DDOS";
                                reject(result);
                            });
                    }

                } else {
                    result.success = false;
                    result.message = "Login Error";
                    reject(result);
                }

            }).catch(function (err) {
                result.message = err;
                reject(result);
            });
        } else {
            result.success = false;
            result.message = "Login Error";
            reject(result);
        }
    });


}