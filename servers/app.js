import Koa from 'koa';
import consign from 'consign';
import log4js from 'koa-log4';
import _ from 'lodash';
import config from './config';
import middleware from './utils/middleware';
import db from './utils/db';
import { router } from './routers';
import docs from 'koa-docs';

const app = new Koa();
const logger = log4js.getLogger("index");

async function init() {
    middleware.execute(config.middleware, app);
    await db.execute(config.db, app);


    app.use(async(ctx, next) => {
        console.log("1", ctx.request.body) // if buffer or text
        console.log("2", ctx.request.files) // if multipart or urlencoded
        console.log("3", ctx.request.fields) // if json
        await next();
    });

    router.execute(app);

    app.listen(process.env.PORT || config.site.PORT || 3000, function() {
        console.log("Server listening on %s", this._connectionKey);
    });
}

init();

export default {
    app: app,
    logger: logger
}