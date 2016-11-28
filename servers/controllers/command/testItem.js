import boom from 'boom';
import utils from '../';
import rabbitmq from '../../utils/rabbitmq';
import { client } from '../../utils/es';
import uuid from 'node-uuid';
import _ from 'lodash';
import db from '../../utils/db';

export default (sequelizeModel) => {
    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let modelIntance = ctx.request.body;

        if (typeof modelIntance !== "object") {
            throw boom.badData('数据没有填写完整!');
        }

        let command = await db.models.command.findOne({
            where: {
                key: modelIntance.command
            }
        });

        if (!command) {
            throw boom.badData("没有找到命令或已删除！");
        }

        let queueItem = {
            cmdid: uuid(),
            cmd: command.cmd,
            listip: _.map(modelIntance.listIps, (service) => {
                return {
                    deviceSn: service._source.deviceSn,
                    ip: service._source.ip[0]
                }
            }),
            args: command.args.split(',') || [], // modelIntance.args ? modelIntance.args.split(',') : [],
            cmdKey: command.key
        };

        let esRes = await client.create({
            index: "cmdb.execute.cmd",
            type: "salt",
            id: queueItem.cmdid,
            body: {
                command: command,
                cmdKey: command.key,
                listip: modelIntance.listIps,
                createdAt: Date.now()
            }
        });

        let result = await rabbitmq.getQueue("cmdb.command", {});
        let res = await result.ch.publish("amq.topic", `salt.commands`, new Buffer(JSON.stringify(queueItem)), {
            persistent: true
        });
        await result.ch.close();

        ctx.body = {
            result: res,
            esRes: esRes,
            queueItem: queueItem,
            jid: queueItem.cmdid
        };
    };
};