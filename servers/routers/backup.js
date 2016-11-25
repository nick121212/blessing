import Router from 'koa-better-router';
import config from '../config';

const init = () => {
    let router = Router({
        prefix: '/backup'
    });

    router.get('/', app.controllers[utils.modelNames.backup]['list'])
        .get('/:key', app.controllers[utils.modelNames.backup]['getItem'])
        .post('/', app.controllers[utils.modelNames.backup]['createItem'])
        .put('/:key', app.controllers[utils.modelNames.backup]['updateItem'])
        .delete('/:key', app.controllers[utils.modelNames.backup]['removeItem']);

    router.addRoute('GET /config', (ctx) => {
        ctx.body = {
            config: config.site
        };
    });

    return router;
};

export default init();