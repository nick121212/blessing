import utils from '../';

export default () => {
    return async(ctx, next) => {
        let results = await utils.elastic.getEsList(ctx.query, 'cmdb.apply');

        ctx.body = results.hits;
    };
};