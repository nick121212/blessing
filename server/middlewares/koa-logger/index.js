/**
 * Created by NICK on 16/8/5.
 */

import logger from 'koa-logger';

module.exports = (app, log)=> {
    "use strict";

    app.use(logger());
}