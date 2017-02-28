import utils from '../';

export default (Model, config) => {

    return async(ctx, next) => {
        let results = await utils.elastic.getEsList(ctx.query, 'cmdb.device.logs');

        ctx.body = results.hits;
    };
};