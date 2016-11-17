/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app) => {
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.device}s`
    });

    router.get('/', app.controllers[utils.modelNames.device]['list'])
        .get('/:key', app.controllers[utils.modelNames.device]['getItem'])
        .post('/', app.controllers[utils.modelNames.device]['createItem'])
        .put('/:key/:type', app.controllers[utils.modelNames.device]['updateItem'])
        .delete('/:key', app.controllers[utils.modelNames.device]['removeItem']);

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};