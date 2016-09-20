/**
 * Created by NICK on 16/8/5.
 */

import * as _ from 'lodash';
import boom from 'boom';

module.exports = (app, logger, crawlerSocket)=> {
    let sockets = {};
    let crawlers = {};

    class SocketInfo {
        constructor() {


            crawlerSocket.on('connection', (ctx)=> {
                sockets[ctx.socket.id] = ctx.socket;
            });

            crawlerSocket.on('crawler:join', (ctx, data)=> {
                let id = ctx.socket.id;

                crawlers[id] = data;
                data.id = id;
                crawlerSocket.broadcast('crawler:join', {id: id, data: data});
            });

            crawlerSocket.on('disconnect', (ctx)=> {
                let id = ctx.socket.id;

                if (crawlers.hasOwnProperty(id)) {
                    crawlerSocket.broadcast('crawler:left', id);
                }

                delete sockets[id];
                delete crawlers[id];
            });

            crawlerSocket.on('getCrawlers', (ctx, data)=> {
                ctx.socket.emit('crawlers:info', crawlers);
                if (_.isFunction(ctx.acknowledge)) {
                    ctx.acknowledge(crawlers);
                }
            });

            crawlerSocket.on('ack', (ctx, data)=> {
                if (!data.id) {
                    return ctx.acknowledge(boom.badData("没有定义socketId！"));
                }
                if (!data.action) {
                    return ctx.acknowledge(boom.badData("没有定义操作！"));
                }

                let socket = sockets[data.id];
                if (socket) {
                    return socket.emit(data.action, data, (result)=> {
                        ctx.acknowledge(result);
                    });
                }

                return ctx.acknowledge(boom.badData(`${data.id}爬虫没有连接！`));
            });

            // crawlerSocket.on('ackBroadcase', (ctx, data)=> {
            //
            // });
        }
    }

    return new SocketInfo();
};