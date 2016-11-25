/**
 * Created by NICK on 16/8/5.
 */

export default (app, logger) => {
    app.use((ctx, next) => {
        if (ctx.isAuthenticated()) {
            return next();
        } else {
            logger.error("没有登陆的账号");
            ctx.redirect('/passport/login');
        }
    });
};