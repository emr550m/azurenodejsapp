var express=require("express");
var bodyParser = require('body-parser')
var mongoSanitize = require('express-mongo-sanitize');
var db = require("./db/mongo");
var log = require("./logger");
var sessionUtil = require("./utility/session");
var port = process.env.PORT || 8080;

db.OpenDB().then((result) => {
    log.info("DB Connection OK: " + result);

    const app = express()
    app.use(bodyParser.json());
    app.use(mongoSanitize({ replaceWith: '_' }));
    
    //request response logger middleware
    app.use(function (req, res, next) {
        var send = res.send;
        res.send = function (data) {
            log.info("Response:" + data + "\n\n");
            send.call(this, data);
        };
        log.info("Request" + JSON.stringify(req.body));
        next();
    });
    app.use('/', express.static('publish'))
    app.post(["/api/open", "/api/open*"], function (request, response, next) {

        var requestRedirect = require("./api/open" + request.url.replace('/api/open', ''));
        requestRedirect(request, response).then(function (result) {
            response.json(result);
            next();
        }).catch(function (err) {
            response.json(err);
            next();
        })
    }); 
    app.post(["/api/auth", "/api/auth*"], function (request, response, next) {

        var requestRedirect = require("./api/auth" + request.url.replace('/api/auth', ''));
        var { username, session } = request.body;
        if (username && session) {
            sessionUtil.checksession(session , username ).then(() => {
                requestRedirect(request, response).then(function (result) {
                    response.json(result);
                    next();
                }).catch(function (err) {
                    response.json(err);
                    next();
                })
            }).catch(function (err) {
                response.json(err);
                next();
            });
        } else {
            response.json({ result: false, message: "Incorrect session." });
            next();
        }
    });

    //General Error Logger..
    app.use(function (err, req, res, next) {
        if (err) {
            log.error("General Error:");
            log.error(err.stack);
        }
        res.json({ message: "Global Error Occurred" });
        next();
    });


 
 
    app.listen(port, () => console.log("Server Ready On port 8080"));

}).catch((err) => {
    log.error("DB Connection Not OK!: " + err);
});