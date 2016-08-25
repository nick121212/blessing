/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app)=> {
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.module}s`
    });

    router.get('/', app.controllers[utils.modelNames.module]['list'])
        .get('/menu', app.controllers[utils.modelNames.module]['menu'])
        .get('/:key', app.controllers[utils.modelNames.module]['getItem'])
        .post('/', app.controllers[utils.modelNames.module]['createItem'])
        .put('/:key', app.controllers[utils.modelNames.module]['updateItem'])
        .delete('/:key', app.controllers[utils.modelNames.module]['removeItem']);

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};