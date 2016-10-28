/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app)=> {
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.action}s`
    });

    router.get('/', app.controllers[utils.modelNames.action]['list'])
        .get('/:key', app.controllers[utils.modelNames.action]['getItem'])
        .post('/', app.controllers[utils.modelNames.action]['createItem'])
        .put('/:key', app.controllers[utils.modelNames.action]['updateItem'])
        .delete('/:key', app.controllers[utils.modelNames.action]['removeItem']);

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};