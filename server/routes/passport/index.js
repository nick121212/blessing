/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';
import passport from 'koa-passport';

module.exports = (app, logger)=> {
    "use strict";

    let router = new Router();

    router.get('/login', async(ctx, next)=> {

        // throw new Error("没有定义参数!");
        await ctx.render('login', {
            title: 'login'
        });
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