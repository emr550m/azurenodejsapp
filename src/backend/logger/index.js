const SimpleNodeLogger = require('simple-node-logger'),
    opts = { 
        logDirectory: 'logs',  
        fileNamePattern: 'LOGS-<DATE>.log',
        dateFormat: 'DD.MM.YYYY',
        timestampFormat:'HH:mm:ss.SSS'
    },
    log = SimpleNodeLogger.createRollingFileLogger(opts);

module.exports = log;