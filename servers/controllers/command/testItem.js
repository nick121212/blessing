import boom from 'boom';
import utils from '../';
import rabbitmq from '../../utils/rabbitmq';
import uuid from 'node-uuid';
import _ from 'lodash';

export default (sequelizeModel) => {
    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let modelIntance = ctx.request.body;

        if (typeof modelIntance !== "object") {
            throw boom.badData('数据没有填写完整!');
        }

        let result = await rabbitmq.getQueue("cmdb.command", {});
        let queueItem = {
            cmdid: uuid(),
            cmd: modelIntance.command.cmd,
            listip: _.map(modelIntance.listIps, (service) => {
                return {
                    deviceSn: service._source.deviceSn,
                    ip: service._source.ip[0]
                }
            }),
            args: modelIntance.args ? modelIntance.args.split(',') : [],
            cmdKey: modelIntance.command.key
        };

        let res = await result.ch.publish("amq.topic", `salt.commands`, new Buffer(JSON.stringify(queueItem)), {
            persistent: true
        });
        await result.ch.close();

        ctx.body = {
            result: res,
            queueItem: queueItem,
            ret: 0
        };
    };
};