/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';
import passport from 'koa-passport';
import boom from 'boom';

module.exports = (app, logger)=> {
    "use strict";

    let router = new Router();

    router.get('/login', async(ctx, next)=> {
        throw boom.unauthorized("用户未登陆或没有权限!");
    });

    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    router.get('/logout', (ctx)=> {
        ctx.logout();
        ctx.redirect('/login');
    });

    app.use(router.routes())
        .use(router.allowedMethods());

    return router;
};