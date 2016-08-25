/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app, logger)=> {
    "use strict";

    let router = new Router({
        prefix: '/home'
    });
    let {serquelize, models}  = app.config.db.index;
    let Model = models['module'];

    router.get('/', async(ctx)=> {
        await ctx.render('index', {
            title: 'Hello World Koa!',
            body: 'I am Nick'
        });
    });

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};