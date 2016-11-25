/**
 * Created by NICK on 16/8/5.
 */

/** jslint es6 */
export default (app, logger) => {
    app.use(async(ctx, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            if (err.isBoom) {
                ctx.status = err.output.statusCode;
            } else {
                ctx.status = err.status || 500;
            }
            ctx.body = {
                msg: err.body || err.message,
                status: ctx.status,
                url: ctx.url,
                name: app.name,
                stack: app.env === "production" ? "" : err.stack + "\n",
                ret: -1
            };
        }
    });
};