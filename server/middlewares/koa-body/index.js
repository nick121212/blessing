/**
 * Created by NICK on 16/8/5.
 */

import bodyParser from 'koa-bodyparser';

module.exports = (app, log)=> {
    "use strict";

    app.use(bodyParser({
        onerror: function (err, ctx) {
            log.error("bodyparser", err);
            ctx.throw('body parse error', 422);
        }
    }));
};