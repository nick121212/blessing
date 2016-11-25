/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

export default (app, logger) => {
    let config = app.config.config.index;
    let router = new Router({
        prefix: '/home'
    });

    router.get('/config', async(ctx) => {
        ctx.body = {
            ret: 0,
            ip: config.ip
        };
    });

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};