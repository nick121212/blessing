import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';
import { app } from "../../spa";
import Promise from "bluebird";

export default () => {

    const callFunc = (conn) => {
        return new Promise((resolve, reject) => {
            conn.socket.clientProxy.deleteFile().onReady((result) => {
                if (!result || result.isBoom) {
                    return reject(result)
                }
                process.nextTick(function() {
                    resolve(result);
                });
            });

        }).timeout(30000);
    }


    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (!key) {
            throw boom.badData(`key不能为空`);
        }

        let conn = _.first(_.filter(app.spaServer.connections, (con) => {
            return con.doc.id == key;
        }));

        if (!conn) {
            throw boom.create(409, "没有发现客户端！");
        }

        await callFunc(conn);

        let result = await client.delete({
            index: 'cmdb.apply',
            type: 'est-agent',
            id: key
        });

        ctx.body = result;
    };
};