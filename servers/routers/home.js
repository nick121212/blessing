import Router from 'koa-better-router';
import config from '../config';
import auth from '../auth';

export default (app) => {
    let router = Router({
        prefix: '/home'
    });

    router.addRoute('GET /config', [auth.passport(app), (ctx) => {
        ctx.body = {
            config: config.site
        };
    }]);

    return router;
};