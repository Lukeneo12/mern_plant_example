const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'plants-tracker-service' },
    transports: [
        new winston.transports.Console({ level: 'info' }),
    ]
});

module.exports = logger;