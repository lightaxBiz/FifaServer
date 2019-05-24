'use strict';

const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const logsUtils = { log: {} };

logsUtils.createNewLogger = () => {
    logsUtils.log = bunyan.createLogger({
        name: 'FifaServer',
        streams: [
            {
                type: 'rotating-file',
                path: './',
                period: '1d',
                count: 14
            }
        ]
    });
};

logsUtils.resetLogger = () => {
    logsUtils.log = {};
};

module.exports = logsUtils;
