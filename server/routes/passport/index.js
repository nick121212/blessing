/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';
import passport from 'koa-passport';
import boom from 'boom';

module.exports = (app, logger)=> {
    "use strict";
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.passport}`
    });

    router.get('/login', async(ctx, next)=> {
        ctx.logout();
        throw boom.unauthorized("用户未登陆或没有权限!");
    });

    router.post('/login',
        passport.authenticate('local', {
            failureRedirect: `/${utils.modelNames.passport}/login`
        }), (res, next)=> {
            res.body = res.passport.user;
        }
    );

    router.post('/logout', (ctx)=> {
        ctx.logout();
        ctx.redirect(`/${utils.modelNames.passport}/login`);
    });

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};