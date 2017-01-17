import createItem from "../apply/createItem";
import getItem from "../apply/getItem";
import { client } from '../../utils/es';

export default (config) => {
    return async(ctx, next) => {
        let item, device;

        try {
            item = await client.get({
                index: 'cmdb.apply',
                type: 'est-agent',
                id: ctx.params.doc.id
            });
        } catch (err) {

        }
        let status = (!item || !item.found) ? false : item._source.status;
        item = await client.index({
            index: 'cmdb.apply',
            type: 'est-agent',
            id: ctx.params.doc.id,
            body: {
                id: ctx.params.doc.id,
                ips: ctx.params.ips["IPv4"],
                hostname: ctx.params.hostname,
                status: status,
                lastCheck: Date.now()
            }
        });
        ctx.body = status;

        await next();
    };
};