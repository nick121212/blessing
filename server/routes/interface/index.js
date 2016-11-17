/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app)=> {
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.schema}s`
    });

    router.get('/', app.controllers[utils.modelNames.schema]['list'])
        .get('/:key', app.controllers[utils.modelNames.schema]['getItem'])
        .post('/', app.controllers[utils.modelNames.schema]['createItem'])
        .put('/:key', app.controllers[utils.modelNames.schema]['updateItem'])
        .delete('/:key', app.controllers[utils.modelNames.schema]['removeItem']);

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};