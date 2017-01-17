import Koa from 'koa';
import config from './config';
import middleware from './utils/middleware';
import { socket } from './utils/socket';
import db from './utils/db';
import { router } from './routers';
import docs from 'koa-docs';
import spa from "./spa";

const app = new Koa();

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});
process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging, throwing an error, or other logic here
});

async function init() {
    // 加载中间件
    middleware.execute(config.middleware, app);
    // 加载sequelize，初始化models
    await db.execute(config.db, app);
    // 加载中间件
    app.use(async(ctx, next) => {

        console.log(ctx.body);

        const start = new Date();
        return next().then(() => {
            const ms = new Date() - start;
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        });
    });
    // 初始化路由
    router.execute(app);
    // 初始化socket
    let server = socket.eventsIo.attach(app);
    // spa server 启动
    await spa(config, app.server);
    // 监听端口
    app.listen(process.env.PORT || config.site.PORT || 3000, () => {
        console.log("Server listening on %s", app.server._connectionKey);
    });
}

init();

export default {
    app: app
}