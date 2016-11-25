/**
 * Created by NICK on 16/8/5.
 */

import log4js from 'koa-log4';

export default (app) => {
    "use strict";

    app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }))
}