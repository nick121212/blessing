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
        prefix: `/upload`
    });

    router.get('/', async(ctx, next)=> {

    });

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};