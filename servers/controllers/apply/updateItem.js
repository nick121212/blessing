import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';
import { app } from "../../spa";

export default () => {

    const callFunc = (conn, key) => {
        return new Promise((resolve, reject) => {
            conn.socket.clientProxy.createFile().onReady(async(result) => {
                if (!result || result.isBoom) {
                    return reject(result)
                }
                resolve(result);
            });
        });
    }

    return async(ctx, next) => {
        let { key, type } = ctx.params;
        let model = ctx.request.body;

        if (!key) {
            throw boom.badData(`key不能为空`);
        }

        let conn = _.first(_.filter(app.spaServer.connections, (con) => {
            return con.doc.id == key;
        }));

        if (!conn) {
            throw boom.create(409, "没有发现客户端！");
        }

        await callFunc(conn, key);
        console.log("-------------------", "");
        ctx.body = await client.update({
            index: 'cmdb.apply',
            type: "est-agent",
            id: key,
            body: {
                doc: {
                    status: true,
                    updatedAt: Date.now()
                }
            }
        })
    };
};