/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app)=> {
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.backup}s`
    });

    router.get('/', app.controllers[utils.modelNames.backup]['list'])
        .put('/:key', app.controllers[utils.modelNames.backup]['createItem'])
        .delete('/:key', app.controllers[utils.modelNames.backup]['removeItem']);

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};