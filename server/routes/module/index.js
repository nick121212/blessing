/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app, logger)=> {
    "use strict";
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.module}`
    });

    router.get('/', app.controllers[utils.modelNames.module]['index']);

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};