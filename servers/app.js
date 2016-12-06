import Koa from 'koa';
import consign from 'consign';
import log4js from 'koa-log4';
import _ from 'lodash';
import config from './config';
import middleware from './utils/middleware';
import { socket } from './utils/socket';
import db from './utils/db';
import { router } from './routers';
import docs from 'koa-docs';

// import * as http from 'http';

const app = new Koa();
const logger = log4js.getLogger("index");

async function init() {
    // 加载中间件
    middleware.execute(config.middleware, app);
    // 加载sequelize，初始化models
    await db.execute(config.db, app);
    // 加载中间件
    app.use(async(ctx, next) => {
        // console.log("1", ctx.request.body) // if buffer or text
        // console.log("2", ctx.request.files) // if multipart or urlencoded
        // console.log("3", ctx.request.fields) // if json
        await next();
    });
    // 初始化路由
    router.execute(app);
    // 初始化socket
    let server = socket.eventsIo.attach(app);
    // 监听端口
    app.listen(process.env.PORT || config.site.PORT || 3000, () => {
        console.log("Server listening on %s", app.server._connectionKey);
    });
}
try {
    init();
} catch (e) {
    console.log(e);
}

export default {
    app: app,
    logger: logger
}