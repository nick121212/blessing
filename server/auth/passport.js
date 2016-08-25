/**
 * Created by NICK on 16/8/5.
 */

module.exports = (app, logger)=> {
    "use strict";

    app.use((ctx, next)=> {
        if (ctx.isAuthenticated()) {
            return next();
        } else {
            logger.error("没有登陆的账号");
            ctx.redirect('/passport/login');
        }
    });
};
