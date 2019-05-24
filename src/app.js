require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const bunyanMiddleware = require('bunyan-middleware');
const logUtils = require('./utils/logs.utils');

const rankingsRouter = require('./routers/rankings.router');

const app = express();

logUtils.createNewLogger();

app.use(
    bunyanMiddleware({
        logger: logUtils.log,
        requestStart: true,
        additionalRequestFinishData: (req, res) => {
            return {
                req_url: req.baseUrl + req.url,
                req_method: req.method,
                req_body: req.body,
                res_body: res.body
            };
        }
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/rankings', rankingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handlers
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;

    res.status(err.status || 500);
    logUtils.log.error(err, 'error handler');
    res.json(err);
});

module.exports = app;
