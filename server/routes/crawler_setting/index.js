/**
 * Created by NICK on 16/8/5.
 */

import Router from 'koa-router';

module.exports = (app)=> {
    let utils = app.config.utils.index;
    let router = new Router({
        prefix: `/${utils.modelNames.crawler_setting}s`
    });

    router.get('/', app.controllers[utils.modelNames.crawler_setting]['list'])
        .get('/:key', app.controllers[utils.modelNames.crawler_setting]['getItem'])
        .post('/', app.controllers[utils.modelNames.crawler_setting]['createItem'])
        .put('/:key', app.controllers[utils.modelNames.crawler_setting]['updateItem'])
        .delete('/:key', app.controllers[utils.modelNames.crawler_setting]['removeItem']);

    app.use(router.routes()).use(router.allowedMethods());

    return router;
};