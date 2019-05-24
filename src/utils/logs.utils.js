'use strict';

const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const logsUtils = { log: {} };

logsUtils.createNewLogger = () => {
    logsUtils.log = bunyan.createLogger({
        name: 'RoomService',
        streams: [
            {
                type: 'rotating-file',
                path: process.env.LOGGER_PATH,
                period: process.env.LOGGER_PERIOD,
                count: parseInt(process.env.LOGGER_COUNT)
            }
        ]
    });
};

logsUtils.resetLogger = () => {
    logsUtils.log = {};
};

module.exports = logsUtils;
