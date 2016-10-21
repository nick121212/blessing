/**
 * Created by NICK on 16/8/5.
 */

import * as _ from 'lodash';
import boom from 'boom';
import IO from 'koa-socket';
import IOClient from 'socket.io-client';

module.exports = (app, logger)=> {
    const socket = new IO({
        namespace: 'salt'
    });
    let sockets = {};

    const client = IOClient("ws://172.16.140.164:8888/ws/d5cb849b62fafb04c6bf1af19d2e504638c5228e");

    class SocketInfo {
        constructor() {
            socket.on('connection', (ctx)=> {
                console.log(ctx.socket.id);
                sockets[ctx.socket.id] = ctx.socket;
            });
        }
    }

    return new SocketInfo();
};