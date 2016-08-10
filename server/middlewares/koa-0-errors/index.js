/**
 * Created by NICK on 16/8/5.
 */


module.exports = (app, logger)=> {
    "use strict";
    app.use(async(ctx, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = {
                msg: err.body || err.message,
                status: ctx.status,
                url: ctx.url,
                stact: err.stack + "\n",
                ret: -1
            };
        }
    });
};
